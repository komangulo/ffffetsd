const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Group extends Model {}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9-]+$/,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 5000],
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          [
            'discussion',
            'education',
            'events',
            'local',
            'lifestyle',
            'fetish',
            'bdsm',
            'kink',
            'lifestyle',
            'other',
          ],
        ],
      },
    },
    type: {
      type: DataTypes.ENUM('public', 'private', 'hidden'),
      defaultValue: 'public',
    },
    location: {
      type: DataTypes.STRING,
    },
    isNsfw: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAgeRestricted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    banner: {
      type: DataTypes.STRING,
    },
    rules: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    settings: {
      type: DataTypes.JSONB,
      defaultValue: {
        postApprovalRequired: false,
        memberApprovalRequired: false,
        postTypesAllowed: ['text', 'image', 'link', 'poll', 'event'],
        membershipTypes: ['member', 'moderator', 'admin'],
        defaultMembershipType: 'member',
        postTags: [],
      },
    },
    stats: {
      type: DataTypes.JSONB,
      defaultValue: {
        memberCount: 0,
        postCount: 0,
        eventCount: 0,
        discussionCount: 0,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeValidate: (group) => {
        // Generate slug from name if not provided
        if (group.name && !group.slug) {
          group.slug = group.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/-+/g, '-') // Replace multiple - with single -
            .trim()
            .substring(0, 100); // Limit length
        }
      },
    },
    indexes: [
      {
        fields: ['slug'],
        unique: true,
      },
      {
        fields: ['name'],
      },
      {
        fields: ['category'],
      },
      {
        fields: ['type'],
      },
      {
        fields: ['is_nsfw'],
      },
    ],
  }
);

module.exports = Group;
