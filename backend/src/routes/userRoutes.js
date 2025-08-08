const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

// Protect all routes after this middleware (require authentication)
router.use(authController.protect);

// User profile routes
router.get('/me', userController.getMe);
router.patch(
  '/update-me',
  [
    body('email').optional().isEmail().withMessage('Please provide a valid email'),
    body('username')
      .optional()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers, and underscores'),
    body('profile.displayName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Display name must be between 2 and 50 characters'),
    body('profile.bio')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Bio cannot be longer than 500 characters'),
    body('profile.location')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Location cannot be longer than 100 characters'),
    body('profile.website')
      .optional()
      .trim()
      .isURL()
      .withMessage('Please provide a valid URL'),
    body('profile.birthday')
      .optional()
      .isISO8601()
      .withMessage('Please provide a valid date of birth'),
    body('profile.gender')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Gender cannot be longer than 50 characters'),
    body('profile.pronouns')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Pronouns cannot be longer than 50 characters'),
    body('profile.relationshipStatus')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Relationship status cannot be longer than 50 characters'),
    body('profile.interests')
      .optional()
      .isArray()
      .withMessage('Interests must be an array'),
    body('profile.kinks')
      .optional()
      .isArray()
      .withMessage('Kinks must be an array'),
    body('profile.roles')
      .optional()
      .isArray()
      .withMessage('Roles must be an array'),
    body('profile.experienceLevel')
      .optional()
      .isIn(['beginner', 'intermediate', 'experienced', 'expert'])
      .withMessage('Invalid experience level'),
    body('profile.lookingFor')
      .optional()
      .isArray()
      .withMessage('Looking for must be an array'),
    body('profile.limits')
      .optional()
      .isArray()
      .withMessage('Limits must be an array'),
  ],
  validateRequest,
  userController.updateMe
);
router.delete('/delete-me', userController.deleteMe);

// User preferences
router.patch(
  '/preferences',
  [
    body('privacySettings')
      .optional()
      .isObject()
      .withMessage('Privacy settings must be an object'),
    body('notificationSettings')
      .optional()
      .isObject()
      .withMessage('Notification settings must be an object'),
  ],
  validateRequest,
  userController.updatePreferences
);

// Search users
router.get('/search', userController.searchUsers);

// Get user by ID (public profile)
router.get('/:id', userController.getUser);

// Admin routes (restricted to admin users)
router.use(authController.restrictTo('admin'));

router.get('/', userController.getAllUsers);
router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
