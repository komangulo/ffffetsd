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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'missing_credentials',
          message: 'Email and password are required',
        },
      });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        status: 'error',
        error: {
          code: data.error?.code || 'login_failed',
          message: data.message || 'Login failed',
          details: data.error?.details,
        },
      });
    }

    // Set the JWT cookie
    const token = response.headers.get('set-cookie');
    if (token) {
      res.setHeader('Set-Cookie', token);
    }

    return res.status(200).json({
      status: 'success',
      data: data.data,
    });
  } catch (error) {
    console.error('Login error:', error);
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
