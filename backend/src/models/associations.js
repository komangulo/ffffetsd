const User = require('./userModel');
const Group = require('./groupModel');
const GroupMember = require('./groupMemberModel');

// User and Group (Many-to-Many through GroupMember)
User.belongsToMany(Group, {
  through: GroupMember,
  foreignKey: 'userId',
  as: 'groups',
});

Group.belongsToMany(User, {
  through: GroupMember,
  foreignKey: 'groupId',
  as: 'members',
});

// Group and GroupMember (One-to-Many)
Group.hasMany(GroupMember, {
  foreignKey: 'groupId',
  as: 'membership',
});

GroupMember.belongsTo(Group, {
  foreignKey: 'groupId',
  as: 'group',
});

// User and GroupMember (One-to-Many)
User.hasMany(GroupMember, {
  foreignKey: 'userId',
  as: 'groupMemberships',
});

GroupMember.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Group Owner (One-to-Many)
Group.belongsTo(User, {
  foreignKey: 'ownerId',
  as: 'owner',
});

User.hasMany(Group, {
  foreignKey: 'ownerId',
  as: 'ownedGroups',
});

// Export all models
module.exports = {
  User,
  Group,
  GroupMember,
};
