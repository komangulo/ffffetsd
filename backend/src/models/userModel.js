const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sequelize } = require('../config/database');

class User extends Model {
  // Method to check if the entered password is correct
  async correctPassword(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  // Method to check if user changed password after the token was issued
  changedPasswordAfter(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < changedTimestamp;
    }
    // False means NOT changed
    return false;
  }

  // Method to create password reset token
  createPasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Token expires in 10 minutes
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30],
        is: /^[a-zA-Z0-9_]+$/,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    passwordChangedAt: DataTypes.DATE,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
    role: {
      type: DataTypes.ENUM('user', 'moderator', 'admin'),
      defaultValue: 'user',
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailVerificationToken: DataTypes.STRING,
    emailVerificationExpires: DataTypes.DATE,
    profile: {
      type: DataTypes.JSONB,
      defaultValue: {
        displayName: '',
        bio: '',
        location: '',
        website: '',
        birthday: null,
        gender: '',
        pronouns: '',
        relationshipStatus: '',
        interests: [],
        kinks: [],
        roles: [],
        experienceLevel: 'beginner',
        lookingFor: [],
        limits: [],
        profilePicture: '',
        coverPhoto: '',
        privacySettings: {
          profileVisibility: 'public',
          activityVisibility: 'friends',
          messagePrivacy: 'anyone',
          showOnlineStatus: true,
          showLastSeen: true,
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastActiveAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeSave: async (user) => {
        // Only run this if password was modified
        if (user.changed('password')) {
          // Hash the password with cost of 12
          user.password = await bcrypt.hash(user.password, 12);
          // Update passwordChangedAt timestamp
          user.passwordChangedAt = Date.now() - 1000;
        }
      },
    },
    defaultScope: {
      attributes: { exclude: ['password', 'passwordChangedAt', 'passwordResetToken', 'passwordResetExpires'] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] },
      },
      withSensitive: {
        attributes: { include: ['password', 'passwordChangedAt', 'passwordResetToken', 'passwordResetExpires'] },
      },
    },
  }
);

module.exports = User;
