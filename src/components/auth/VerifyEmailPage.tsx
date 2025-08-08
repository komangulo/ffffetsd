import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button/Button';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

type VerificationStatus = 'verifying' | 'success' | 'error' | 'invalid';

export function VerifyEmailPage() {
  const [status, setStatus] = useState<VerificationStatus>('verifying');
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('invalid');
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify-email/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to verify email');
        }

        setStatus('success');
      } catch (err) {
        const error = err as Error;
        setStatus('error');
        setError(error.message || 'An error occurred while verifying your email');
      }
    };

    verifyEmail();
  }, [token]);

  if (status === 'verifying') {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Verifying your email...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we verify your email address.
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Email Verified Successfully!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Thank you for verifying your email address. You can now sign in to your account.
        </p>
        <div className="pt-4">
          <Button
            variant="primary"
            onClick={() => router.push('/login')}
          >
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (status === 'invalid') {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <XCircle className="h-12 w-12 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Invalid Verification Link
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The verification link is invalid or has expired. Please request a new verification email.
        </p>
        <div className="pt-4">
          <Button
            variant="primary"
            onClick={() => router.push('/resend-verification')}
          >
            Resend Verification Email
          </Button>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="w-full max-w-md space-y-6 text-center">
      <div className="flex justify-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Verification Failed
      </h2>
      <p className="text-red-600 dark:text-red-400">{error}</p>
      <p className="text-gray-600 dark:text-gray-400">
        Please try again or contact support if the problem persists.
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
        <Button
          variant="primary"
          onClick={() => router.push('/contact')}
        >
          Contact Support
        </Button>
      </div>
    </div>
  );
}
