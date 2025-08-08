import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types';

export class ApiError extends Error {
  statusCode: number;
  code: string;
  details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'server_error',
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const withErrorHandler = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          status: 'error',
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
        });
      }

      // Handle validation errors
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: 'error',
          error: {
            code: 'validation_error',
            message: 'Validation failed',
            details: error.errors,
          },
        });
      }

      // Handle JWT errors
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          error: {
            code: 'invalid_token',
            message: 'Invalid or expired token',
          },
        });
      }

      // Default error response
      res.status(500).json({
        status: 'error',
        error: {
          code: 'server_error',
          message: 'An unexpected error occurred',
        },
      });
    }
  };
};

// Helper functions for common errors
export const notFound = (message: string = 'Resource not found') => {
  throw new ApiError(message, 404, 'not_found');
};

export const unauthorized = (message: string = 'Not authorized') => {
  throw new ApiError(message, 401, 'unauthorized');
};

export const forbidden = (message: string = 'Forbidden') => {
  throw new ApiError(message, 403, 'forbidden');
};

export const badRequest = (message: string = 'Bad request', details?: any) => {
  throw new ApiError(message, 400, 'bad_request', details);
};

export const validationError = (errors: any) => {
  throw new ApiError('Validation failed', 400, 'validation_error', errors);
};
