import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types';
import { withErrorHandler } from '@/lib/error-handler';

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  if (req.method !== 'PATCH') {
    return res.status(405).json({
      status: 'error',
      error: {
        code: 'method_not_allowed',
        message: 'Only PATCH requests are allowed',
      },
    });
  }

  try {
    const { token } = req.query;
    const { password, passwordConfirm } = req.body;

    if (!token) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'missing_token',
          message: 'Password reset token is required',
        },
      });
    }

    if (!password || !passwordConfirm) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'missing_fields',
          message: 'Password and password confirmation are required',
        },
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'password_mismatch',
          message: 'Passwords do not match',
        },
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'weak_password',
          message: 'Password must be at least 8 characters long',
        },
      });
    }

    // Call the backend API to reset the password
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reset-password/${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, passwordConfirm }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        status: 'error',
        error: {
          code: data.error?.code || 'password_reset_failed',
          message: data.message || 'Failed to reset password',
          details: data.error?.details,
        },
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Password has been reset successfully. You can now log in with your new password.',
      },
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      status: 'error',
      error: {
        code: 'server_error',
        message: 'An unexpected error occurred',
      },
    });
  }
};

export default withErrorHandler(handler);
