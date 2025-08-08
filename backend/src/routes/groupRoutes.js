const express = require('express');
const { body, param } = require('express-validator');
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

// Public routes
router.get(
  '/',
  [
    param('category').optional().isString().trim(),
    param('type').optional().isIn(['public', 'private', 'hidden']),
    param('isNsfw').optional().isBoolean(),
    param('search').optional().isString().trim(),
    param('sortBy').optional().isIn(['newest', 'oldest', 'most_members', 'most_active']),
    param('page').optional().isInt({ min: 1 }),
    param('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  validateRequest,
  groupController.getAllGroups
);

router.get(
  '/:id',
  [
    param('id').isString().trim().notEmpty(),
  ],
  validateRequest,
  groupController.getGroup
);

// Protected routes (require authentication)
router.use(authController.protect);

// Group management
router.post(
  '/',
  [
    body('name').isString().trim().isLength({ min: 3, max: 100 }),
    body('description').isString().trim().isLength({ min: 10, max: 5000 }),
    body('category').isIn([
      'discussion',
      'education',
      'events',
      'local',
      'lifestyle',
      'fetish',
      'bdsm',
      'kink',
      'other',
    ]),
    body('type').optional().isIn(['public', 'private', 'hidden']),
    body('isNsfw').optional().isBoolean(),
    body('avatar').optional().isURL(),
    body('banner').optional().isURL(),
    body('rules').optional().isArray(),
    body('rules.*').isString().trim().notEmpty(),
  ],
  validateRequest,
  groupController.createGroup
);

router.patch(
  '/:id',
  [
    param('id').isUUID(),
    body('name').optional().isString().trim().isLength({ min: 3, max: 100 }),
    body('description').optional().isString().trim().isLength({ min: 10, max: 5000 }),
    body('category').optional().isIn([
      'discussion',
      'education',
      'events',
      'local',
      'lifestyle',
      'fetish',
      'bdsm',
      'kink',
      'other',
    ]),
    body('type').optional().isIn(['public', 'private', 'hidden']),
    body('isNsfw').optional().isBoolean(),
    body('avatar').optional().isURL(),
    body('banner').optional().isURL(),
    body('rules').optional().isArray(),
    body('rules.*').optional().isString().trim().notEmpty(),
    body('settings').optional().isObject(),
    body('settings.postApprovalRequired').optional().isBoolean(),
    body('settings.memberApprovalRequired').optional().isBoolean(),
    body('settings.postTypesAllowed').optional().isArray(),
    body('settings.postTags').optional().isArray(),
  ],
  validateRequest,
  groupController.updateGroup
);

router.delete(
  '/:id',
  [
    param('id').isUUID(),
  ],
  validateRequest,
  groupController.deleteGroup
);

// Group membership
router.post(
  '/:id/join',
  [
    param('id').isUUID(),
  ],
  validateRequest,
  groupController.joinGroup
);

router.post(
  '/:id/leave',
  [
    param('id').isUUID(),
  ],
  validateRequest,
  groupController.leaveGroup
);

// Group member management
router.post(
  '/:groupId/members/:userId',
  [
    param('groupId').isUUID(),
    param('userId').isUUID(),
    body('action').isIn([
      'approve',
      'reject',
      'promote',
      'demote',
      'ban',
      'unban',
      'remove',
    ]),
    body('role').optional().isIn(['member', 'moderator', 'admin']),
    body('reason').optional().isString().trim(),
  ],
  validateRequest,
  groupController.manageGroupMember
);

// Group ownership transfer
router.post(
  '/:groupId/transfer-ownership/:newOwnerId',
  [
    param('groupId').isUUID(),
    param('newOwnerId').isUUID(),
  ],
  validateRequest,
  groupController.transferOwnership
);

module.exports = router;
