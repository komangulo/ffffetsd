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
    // Clear the JWT cookie
    res.setHeader(
      'Set-Cookie',
      'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax'
    );

    // Call the backend API to invalidate the session
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Logout failed:', data);
      // Still return success even if backend logout fails, since we've cleared the cookie
    }

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Successfully logged out',
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
    // Still return success to clear the client-side state
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Successfully logged out',
      },
    });
  }
};

export default withErrorHandler(handler);
