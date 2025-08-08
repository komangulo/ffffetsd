import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types';
import { withErrorHandler } from '@/lib/error-handler';

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      error: {
        code: 'method_not_allowed',
        message: 'Only GET requests are allowed',
      },
    });
  }

  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'missing_token',
          message: 'Email verification token is required',
        },
      });
    }

    // Call the backend API to verify the email
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-email/${token}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        status: 'error',
        error: {
          code: data.error?.code || 'email_verification_failed',
          message: data.message || 'Failed to verify email',
          details: data.error?.details,
        },
      });
    }

    // Redirect to the login page with a success message
    res.setHeader('Location', '/login?verified=1');
    res.statusCode = 302;
    res.end();
    return;
  } catch (error) {
    console.error('Email verification error:', error);
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
