const jwt = require('jsonwebtoken');
const { AppError } = require('./errorMiddleware');
const User = require('../models/userModel');

// Protect routes - user must be authenticated
const protect = async (req, res, next) => {
  try {
    let token;
    
    // 1) Get token from header or cookies
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2) Check if token exists
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // 3) Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // 4) Check if user still exists
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists.', 401)
      );
    }

    // 5) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

// Restrict to certain roles
const restrictTo = (...roles) => {
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

// Only for rendered pages, no errors!
const isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      // 1) Verify token
      const decoded = await jwt.verify(req.cookies.token, process.env.JWT_SECRET);

      // 2) Check if user still exists
      const currentUser = await User.findByPk(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    }
    next();
  } catch (err) {
    next();
  }
};

module.exports = {
  protect,
  restrictTo,
  isLoggedIn,
};
