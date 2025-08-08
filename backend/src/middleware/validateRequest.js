const { validationResult } = require('express-validator');
const { AppError } = require('./errorMiddleware');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Format errors to a more readable format
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg,
    }));
    
    return next(new AppError('Validation failed', 400, formattedErrors));
  }
  
  next();
};

module.exports = {
  validateRequest,
};
