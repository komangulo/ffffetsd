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
    const { username, email, password, passwordConfirm, birthday } = req.body;

    // Basic validation
    if (!username || !email || !password || !passwordConfirm || !birthday) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'missing_fields',
          message: 'All fields are required',
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

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'invalid_email',
          message: 'Please provide a valid email address',
        },
      });
    }

    // Validate age (must be 18+)
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'age_restriction',
          message: 'You must be at least 18 years old to register',
        },
      });
    }

    // Call the backend API to register the user
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        passwordConfirm,
        profile: {
          birthdate: birthday,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        status: 'error',
        error: {
          code: data.error?.code || 'registration_failed',
          message: data.message || 'Registration failed',
          details: data.error?.details,
        },
      });
    }

    return res.status(201).json({
      status: 'success',
      data: {
        message: 'Registration successful. Please check your email to verify your account.',
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
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
