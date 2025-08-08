const { Op } = require('sequelize');
const { AppError } = require('../middleware/errorMiddleware');
const User = require('../models/userModel');

// Helper function to filter object fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Get current user profile
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateMe = async (req, res, next) => {
  try {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /update-password.',
          400
        )
      );
    }

    // 2) Filtered out unwanted fields that are not allowed to be updated
    const filteredBody = filterObj(
      req.body,
      'email',
      'username',
      'profile'
    );

    // 3) Update user document
    const updatedUser = await User.update(filteredBody, {
      where: { id: req.user.id },
      returning: true,
      individualHooks: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser[1][0],
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete (deactivate) user account
exports.deleteMe = async (req, res, next) => {
  try {
    await User.update(
      { isActive: false },
      {
        where: { id: req.user.id },
      }
    );

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID (public profile)
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { 
        id: req.params.id,
        isActive: true 
      },
      attributes: {
        exclude: [
          'password',
          'passwordChangedAt',
          'passwordResetToken',
          'passwordResetExpires',
          'emailVerificationToken',
          'emailVerificationExpires',
        ],
      },
    });

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: [
          'password',
          'passwordChangedAt',
          'passwordResetToken',
          'passwordResetExpires',
          'emailVerificationToken',
          'emailVerificationExpires',
        ],
      },
      where: { isActive: true },
    });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update user (admin only)
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    // Filter out fields that are not allowed to be updated
    const filteredBody = filterObj(
      req.body,
      'email',
      'username',
      'role',
      'isActive',
      'isEmailVerified',
      'profile'
    );

    const updatedUser = await user.update(filteredBody, {
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    await user.destroy();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Search users
exports.searchUsers = async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return next(new AppError('Please provide a search query', 400));
    }

    const users = await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: `%${query}%` } },
          { '$profile.displayName$': { [Op.iLike]: `%${query}%` } },
        ],
        isActive: true,
      },
      attributes: {
        exclude: [
          'password',
          'passwordChangedAt',
          'passwordResetToken',
          'passwordResetExpires',
          'emailVerificationToken',
          'emailVerificationExpires',
        ],
      },
      limit: 20,
    });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update user preferences
exports.updatePreferences = async (req, res, next) => {
  try {
    const { privacySettings, notificationSettings } = req.body;
    const updates = {};

    if (privacySettings) {
      updates['profile.privacySettings'] = {
        ...req.user.profile.privacySettings,
        ...privacySettings,
      };
    }

    if (notificationSettings) {
      updates['profile.notificationSettings'] = {
        ...(req.user.profile.notificationSettings || {}),
        ...notificationSettings,
      };
    }

    await User.update(
      { profile: { ...req.user.profile, ...updates } },
      {
        where: { id: req.user.id },
        returning: true,
        individualHooks: true,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Preferences updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
