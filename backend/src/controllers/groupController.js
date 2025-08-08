const { Op } = require('sequelize');
const { AppError } = require('../middleware/errorMiddleware');
const { User, Group, GroupMember } = require('../models/associations');

// Helper function to check if user has permission
const checkGroupPermission = (user, group, requiredRole = 'member') => {
  // If user is the owner, they have all permissions
  if (group.ownerId === user.id) return true;
  
  // Check group membership and role
  const membership = group.membership?.find(m => m.userId === user.id);
  
  if (!membership || membership.status !== 'approved' || membership.isBanned) {
    return false;
  }
  
  // Define role hierarchy
  const roleHierarchy = {
    member: 1,
    moderator: 2,
    admin: 3,
    owner: 4
  };
  
  return roleHierarchy[membership.role] >= roleHierarchy[requiredRole];
};

// Create a new group
exports.createGroup = async (req, res, next) => {
  try {
    const { name, description, category, type, isNsfw, avatar, banner, rules } = req.body;
    
    // Create the group
    const group = await Group.create({
      name,
      description,
      category,
      type: type || 'public',
      isNsfw: isNsfw || false,
      avatar,
      banner,
      rules: rules || [],
      ownerId: req.user.id,
      stats: {
        memberCount: 1,
        postCount: 0,
        eventCount: 0,
        discussionCount: 0,
      },
    });
    
    // Add the creator as the group owner
    await GroupMember.create({
      userId: req.user.id,
      groupId: group.id,
      role: 'owner',
      status: 'approved',
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        group,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all groups (with filters)
exports.getAllGroups = async (req, res, next) => {
  try {
    const { category, type, isNsfw, search, sortBy = 'newest', page = 1, limit = 20 } = req.query;
    
    const where = { isActive: true };
    const order = [];
    const include = [];
    
    // Apply filters
    if (category) where.category = category;
    if (type) where.type = type;
    if (isNsfw !== undefined) where.isNsfw = isNsfw === 'true';
    
    // Search by name or description
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }
    
    // Sorting
    switch (sortBy) {
      case 'newest':
        order.push(['createdAt', 'DESC']);
        break;
      case 'oldest':
        order.push(['createdAt', 'ASC']);
        break;
      case 'most_members':
        order.push([sequelize.literal('"stats"->>\'memberCount\''), 'DESC']);
        break;
      case 'most_active':
        order.push([sequelize.literal('"stats"->>\'postCount\''), 'DESC']);
        break;
      default:
        order.push(['createdAt', 'DESC']);
    }
    
    // Pagination
    const offset = (page - 1) * limit;
    
    const { count, rows: groups } = await Group.findAndCountAll({
      where,
      include,
      order,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    
    res.status(200).json({
      status: 'success',
      results: count,
      data: {
        groups,
      },
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a single group by ID or slug
exports.getGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const group = await Group.findOne({
      where: {
        [Op.or]: [
          { id },
          { slug: id },
        ],
        isActive: true,
      },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'profile'],
        },
        {
          model: GroupMember,
          as: 'membership',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'profile'],
            },
          ],
        },
      ],
    });
    
    if (!group) {
      return next(new AppError('No group found with that ID or slug', 404));
    }
    
    // Check if group is private and user has access
    if (group.type === 'private' || group.type === 'hidden') {
      const hasAccess = group.membership.some(
        member => member.userId === req.user?.id && member.status === 'approved' && !member.isBanned
      );
      
      if (!hasAccess && req.user?.id !== group.ownerId) {
        return next(new AppError('You do not have permission to view this group', 403));
      }
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        group,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update a group
exports.updateGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const group = await Group.findByPk(id, {
      include: [
        {
          model: GroupMember,
          as: 'membership',
          where: { userId: req.user.id },
          required: false,
        },
      ],
    });
    
    if (!group) {
      return next(new AppError('No group found with that ID', 404));
    }
    
    // Check if user has permission to update the group
    const isOwner = group.ownerId === req.user.id;
    const isAdmin = group.membership?.some(
      m => m.role === 'admin' && m.status === 'approved' && !m.isBanned
    );
    
    if (!isOwner && !isAdmin) {
      return next(new AppError('You do not have permission to update this group', 403));
    }
    
    // Filter out restricted fields if not owner
    if (!isOwner) {
      const allowedFields = [
        'description', 'avatar', 'banner', 'rules', 'settings.postApprovalRequired',
        'settings.memberApprovalRequired', 'settings.postTypesAllowed', 'settings.postTags'
      ];
      
      Object.keys(updates).forEach(key => {
        if (!allowedFields.some(field => key === field || key.startsWith(`${field}.`))) {
          delete updates[key];
        }
      });
    }
    
    // Update the group
    await group.update(updates);
    
    res.status(200).json({
      status: 'success',
      data: {
        group,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a group
exports.deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const group = await Group.findByPk(id);
    
    if (!group) {
      return next(new AppError('No group found with that ID', 404));
    }
    
    // Only the owner can delete the group
    if (group.ownerId !== req.user.id) {
      return next(new AppError('Only the group owner can delete this group', 403));
    }
    
    // Soft delete the group
    await group.update({ isActive: false });
    
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Join a group
exports.joinGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const group = await Group.findByPk(id);
    
    if (!group || !group.isActive) {
      return next(new AppError('No group found with that ID', 404));
    }
    
    // Check if group is hidden
    if (group.type === 'hidden') {
      return next(new AppError('This group is hidden and cannot be joined directly', 403));
    }
    
    // Check if user is already a member
    const existingMembership = await GroupMember.findOne({
      where: {
        userId: req.user.id,
        groupId: group.id,
      },
    });
    
    if (existingMembership) {
      if (existingMembership.status === 'banned') {
        return next(new AppError('You have been banned from this group', 403));
      }
      
      if (existingMembership.status === 'pending') {
        return next(new AppError('Your join request is pending approval', 400));
      }
      
      return next(new AppError('You are already a member of this group', 400));
    }
    
    // Create membership
    const membership = await GroupMember.create({
      userId: req.user.id,
      groupId: group.id,
      role: 'member',
      status: group.settings?.memberApprovalRequired ? 'pending' : 'approved',
    });
    
    // Update member count if approved
    if (membership.status === 'approved') {
      await group.increment('stats.memberCount');
    }
    
    res.status(201).json({
      status: 'success',
      data: {
        membership,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Leave a group
exports.leaveGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const group = await Group.findByPk(id);
    
    if (!group) {
      return next(new AppError('No group found with that ID', 404));
    }
    
    // Check if user is the owner (owners can't leave, must transfer ownership or delete)
    if (group.ownerId === req.user.id) {
      return next(new AppError('Group owners must transfer ownership before leaving', 400));
    }
    
    // Delete membership
    const result = await GroupMember.destroy({
      where: {
        userId: req.user.id,
        groupId: group.id,
      },
    });
    
    if (result === 0) {
      return next(new AppError('You are not a member of this group', 400));
    }
    
    // Update member count
    await group.decrement('stats.memberCount');
    
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Manage group members
exports.manageGroupMember = async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;
    const { action, role, reason } = req.body;
    
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: GroupMember,
          as: 'membership',
          where: { userId: req.user.id },
          required: false,
        },
      ],
    });
    
    if (!group) {
      return next(new AppError('No group found with that ID', 404));
    }
    
    // Check if requester has permission (owner or admin)
    const isOwner = group.ownerId === req.user.id;
    const isAdmin = group.membership?.some(
      m => m.role === 'admin' && m.status === 'approved' && !m.isBanned
    );
    
    if (!isOwner && !isAdmin) {
      return next(new AppError('You do not have permission to manage members', 403));
    }
    
    // Get the target user's membership
    const targetMembership = await GroupMember.findOne({
      where: {
        userId,
        groupId: group.id,
      },
    });
    
    if (!targetMembership) {
      return next(new AppError('User is not a member of this group', 404));
    }
    
    // Handle different actions
    switch (action) {
      case 'approve':
        if (targetMembership.status !== 'pending') {
          return next(new AppError('User does not have a pending join request', 400));
        }
        
        targetMembership.status = 'approved';
        await targetMembership.save();
        await group.increment('stats.memberCount');
        break;
        
      case 'reject':
        if (targetMembership.status !== 'pending') {
          return next(new AppError('User does not have a pending join request', 400));
        }
        
        await targetMembership.destroy();
        break;
        
      case 'promote':
        if (!role) {
          return next(new AppError('Role is required for this action', 400));
        }
        
        // Only owners can assign admin role
        if (role === 'admin' && !isOwner) {
          return next(new AppError('Only the group owner can assign admin role', 403));
        }
        
        targetMembership.role = role;
        await targetMembership.save();
        break;
        
      case 'demote':
        // Can't demote owners
        if (targetMembership.role === 'owner') {
          return next(new AppError('Cannot demote the group owner', 400));
        }
        
        // Only owners can demote admins
        if (targetMembership.role === 'admin' && !isOwner) {
          return next(new AppError('Only the group owner can demote admins', 403));
        }
        
        targetMembership.role = 'member';
        await targetMembership.save();
        break;
        
      case 'ban':
        // Can't ban owners
        if (targetMembership.role === 'owner') {
          return next(new AppError('Cannot ban the group owner', 400));
        }
        
        // Only owners can ban admins
        if (targetMembership.role === 'admin' && !isOwner) {
          return next(new AppError('Only the group owner can ban admins', 403));
        }
        
        targetMembership.isBanned = true;
        targetMembership.banReason = reason || 'No reason provided';
        targetMembership.status = 'banned';
        await targetMembership.save();
        
        // Decrement member count if they were approved
        if (targetMembership.status === 'approved') {
          await group.decrement('stats.memberCount');
        }
        break;
        
      case 'unban':
        if (!targetMembership.isBanned) {
          return next(new AppError('User is not banned', 400));
        }
        
        targetMembership.isBanned = false;
        targetMembership.banReason = null;
        targetMembership.status = 'approved';
        await targetMembership.save();
        
        // Increment member count
        await group.increment('stats.memberCount');
        break;
        
      case 'remove':
        // Can't remove owners
        if (targetMembership.role === 'owner') {
          return next(new AppError('Cannot remove the group owner', 400));
        }
        
        // Only owners can remove admins
        if (targetMembership.role === 'admin' && !isOwner) {
          return next(new AppError('Only the group owner can remove admins', 403));
        }
        
        await targetMembership.destroy();
        
        // Decrement member count if they were approved
        if (targetMembership.status === 'approved') {
          await group.decrement('stats.memberCount');
        }
        break;
        
      default:
        return next(new AppError('Invalid action', 400));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        membership: targetMembership,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Transfer group ownership
exports.transferOwnership = async (req, res, next) => {
  try {
    const { groupId, newOwnerId } = req.params;
    
    const group = await Group.findByPk(groupId);
    
    if (!group) {
      return next(new AppError('No group found with that ID', 404));
    }
    
    // Only current owner can transfer ownership
    if (group.ownerId !== req.user.id) {
      return next(new AppError('Only the group owner can transfer ownership', 403));
    }
    
    // Can't transfer to self
    if (newOwnerId === req.user.id) {
      return next(new AppError('You are already the owner of this group', 400));
    }
    
    // Check if new owner is a member of the group
    const newOwnerMembership = await GroupMember.findOne({
      where: {
        userId: newOwnerId,
        groupId: group.id,
        status: 'approved',
      },
    });
    
    if (!newOwnerMembership) {
      return next(new AppError('New owner must be an approved member of the group', 400));
    }
    
    // Start transaction
    const transaction = await sequelize.transaction();
    
    try {
      // Update new owner's role to admin if not already
      if (newOwnerMembership.role !== 'admin') {
        await newOwnerMembership.update({ role: 'admin' }, { transaction });
      }
      
      // Transfer ownership
      await group.update({ ownerId: newOwnerId }, { transaction });
      
      // Update old owner's role to admin
      await GroupMember.update(
        { role: 'admin' },
        {
          where: {
            userId: req.user.id,
            groupId: group.id,
          },
          transaction,
        }
      );
      
      await transaction.commit();
      
      res.status(200).json({
        status: 'success',
        message: 'Group ownership transferred successfully',
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
