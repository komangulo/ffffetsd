const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const { Op } = require('sequelize');
const { AppError } = require('../middleware/errorMiddleware');
const { sendEmail } = require('../utils/email');
const User = require('../models/userModel');
const { sequelize } = require('../config/database');

// Generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Create and send JWT token
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);
  
  // Set cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'lax',
  };

  // Send JWT as cookie
  res.cookie('token', token, cookieOptions);

  // Remove sensitive data from output
  user.password = undefined;
  user.passwordChangedAt = undefined;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Signup a new user
exports.signup = async (req, res, next) => {
  try {
    const transaction = await sequelize.transaction();
    
    // 1) Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { username: req.body.username },
        ],
      },
      transaction,
    });

    if (existingUser) {
      await transaction.rollback();
      return next(
        new AppError('User with that email or username already exists', 400)
      );
    }

    // 2) Create new user
    const newUser = await User.create(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profile: {
          displayName: req.body.displayName || req.body.username,
          birthday: req.body.birthday,
          gender: req.body.gender,
          pronouns: req.body.pronouns,
        },
      },
      { transaction }
    );

    // 3) Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    
    await newUser.update(
      {
        emailVerificationToken: crypto
          .createHash('sha256')
          .update(emailVerificationToken)
          .digest('hex'),
        emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      },
      { transaction }
    );

    // 4) Send welcome email with verification link
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${emailVerificationToken}`;
    
    try {
      await sendEmail({
        email: newUser.email,
        subject: 'Verify your email address',
        template: 'welcome',
        context: {
          name: newUser.profile.displayName,
          verificationUrl,
        },
      });
    } catch (err) {
      await transaction.rollback();
      return next(
        new AppError('There was an error sending the verification email. Please try again later.', 500)
      );
    }

    await transaction.commit();
    
    // 5) Send response
    createSendToken(newUser, 201, req, res);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    // 2) Check if user exists && password is correct
    const user = await User.scope('withPassword').findOne({
      where: { email },
    });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) Check if email is verified
    if (!user.isEmailVerified) {
      return next(
        new AppError('Please verify your email address before logging in', 401)
      );
    }

    // 4) Update last active timestamp
    await user.update({ lastActiveAt: Date.now() });

    // 5) If everything ok, send token to client
    createSendToken(user, 200, req, res);
  } catch (error) {
    next(error);
  }
};

// Logout user
exports.logout = (req, res) => {
  res.cookie('token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// Protect routes - check if user is authenticated
exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

// Restrict to certain roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array of allowed roles ['admin', 'moderator']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

// Forgot password
exports.forgotPassword = async (req, res, next) => {
  try {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return next(new AppError('There is no user with that email address.', 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validate: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/reset-password/${resetToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        template: 'password-reset',
        context: {
          name: user.profile.displayName,
          resetURL,
        },
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validate: false });

      return next(
        new AppError(
          'There was an error sending the email. Try again later!',
          500
        )
      );
    }
  } catch (error) {
    next(error);
  }
};

// Reset password
exports.resetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { [Op.gt]: Date.now() },
      },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    // 3) Update changedPasswordAt property for the user (handled in the model hook)

    // 4) Log the user in, send JWT
    createSendToken(user, 200, req, res);
  } catch (error) {
    next(error);
  }
};

// Update password
exports.updatePassword = async (req, res, next) => {
  try {
    // 1) Get user from collection
    const user = await User.scope('withPassword').findByPk(req.user.id);

    // 2) Check if POSTed current password is correct
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError('Your current password is wrong.', 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    await user.save();

    // 4) Log user in, send JWT
    createSendToken(user, 200, req, res);
  } catch (error) {
    next(error);
  }
};

// Verify email
exports.verifyEmail = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      where: {
        emailVerificationToken: hashedToken,
        emailVerificationExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save({ validate: false });

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully!',
    });
  } catch (error) {
    next(error);
  }
};

// Resend verification email
exports.resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return next(new AppError('Please provide an email address', 400));
    }

    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return next(new AppError('No user found with that email address', 404));
    }

    if (user.isEmailVerified) {
      return next(new AppError('Email is already verified', 400));
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    
    await user.update({
      emailVerificationToken: crypto
        .createHash('sha256')
        .update(emailVerificationToken)
        .digest('hex'),
      emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // Send verification email
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${emailVerificationToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Verify your email address',
      template: 'verify-email',
      context: {
        name: user.profile.displayName || user.username,
        verificationUrl,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Verification email sent!',
    });
  } catch (error) {
    next(error);
  }
};
