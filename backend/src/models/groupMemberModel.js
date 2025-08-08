const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class GroupMember extends Model {}

GroupMember.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM('member', 'moderator', 'admin', 'owner'),
      defaultValue: 'member',
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'banned'),
      defaultValue: 'approved',
      allowNull: false,
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    lastSeen: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    notificationSettings: {
      type: DataTypes.JSONB,
      defaultValue: {
        newPosts: true,
        newEvents: true,
        eventReminders: true,
        announcements: true,
        mentions: true,
        directMessages: true,
      },
    },
    isMuted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    bannedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    banReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    customTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permissions: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'GroupMember',
    tableName: 'group_members',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_id', 'group_id'],
        unique: true,
      },
      {
        fields: ['status'],
      },
      {
        fields: ['role'],
      },
      {
        fields: ['is_banned'],
      },
    ],
  }
);

// Add associations in a separate file to avoid circular dependencies

module.exports = GroupMember;
