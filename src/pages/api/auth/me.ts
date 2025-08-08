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
    // Forward the request to the backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: req.headers.cookie || '',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized, clear the token cookie
      if (response.status === 401) {
        res.setHeader(
          'Set-Cookie',
          'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax'
        );
      }

      return res.status(response.status).json({
        status: 'error',
        error: {
          code: data.error?.code || 'unauthorized',
          message: data.message || 'Not authenticated',
        },
      });
    }

    return res.status(200).json({
      status: 'success',
      data: data.data,
    });
  } catch (error) {
    console.error('Get current user error:', error);
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
