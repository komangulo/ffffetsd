const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

// Public routes (no authentication required)
router.post(
  '/signup',
  [
    body('username')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers, and underscores'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[0-9]/)
      .withMessage('Password must contain a number')
      .matches(/[a-z]/)
      .withMessage('Password must contain a lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password must contain an uppercase letter'),
    body('passwordConfirm')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
    body('birthday')
      .isISO8601()
      .withMessage('Please provide a valid date of birth')
      .custom((value) => {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 18) {
          throw new Error('You must be at least 18 years old to sign up');
        }
        return true;
      }),
  ],
  validateRequest,
  authController.signup
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Please provide a password'),
  ],
  validateRequest,
  authController.login
);

router.post('/forgot-password', 
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
  ],
  validateRequest,
  authController.forgotPassword
);

router.patch(
  '/reset-password/:token',
  [
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[0-9]/)
      .withMessage('Password must contain a number')
      .matches(/[a-z]/)
      .withMessage('Password must contain a lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password must contain an uppercase letter'),
    body('passwordConfirm')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
  ],
  validateRequest,
  authController.resetPassword
);

router.get('/verify-email/:token', authController.verifyEmail);
router.post('/resend-verification', 
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
  ],
  validateRequest,
  authController.resendVerificationEmail
);

// Protected routes (authentication required)
router.use(authController.protect);

router.get('/logout', authController.logout);

router.patch(
  '/update-password',
  [
    body('passwordCurrent').not().isEmpty().withMessage('Current password is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[0-9]/)
      .withMessage('Password must contain a number')
      .matches(/[a-z]/)
      .withMessage('Password must contain a lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password must contain an uppercase letter'),
    body('passwordConfirm')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
  ],
  validateRequest,
  authController.updatePassword
);

module.exports = router;
