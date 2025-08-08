import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types';
import { withErrorHandler } from '@/lib/error-handler';

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      error: {
        code: 'method_not_allowed',
        message: 'Only POST requests are allowed',
      },
    });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'missing_email',
          message: 'Email is required',
        },
      });
    }

    // Call the backend API to send password reset email
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Don't reveal if the email exists or not for security reasons
      // Just return success to prevent email enumeration
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'If an account exists with this email, you will receive a password reset link',
        },
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'If an account exists with this email, you will receive a password reset link',
      },
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'If an account exists with this email, you will receive a password reset link',
      },
    });
  }
};

export default withErrorHandler(handler);
