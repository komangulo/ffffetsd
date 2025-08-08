import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/Button';
import { FormInput } from '@/components/ui/form/FormInput';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to reset password');
      }
      
      setIsSubmitted(true);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Invalid Reset Link
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The password reset link is invalid or has expired. Please request a new reset link.
        </p>
        <div className="pt-4">
          <Button
            variant="primary"
            onClick={() => router.push('/forgot-password')}
          >
            Request New Reset Link
          </Button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Password Reset Successful
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your password has been successfully reset. You can now sign in with your new password.
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

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Reset your password
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter your new password below to reset your password.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 rounded-md shadow-sm">
          <FormInput
            id="password"
            type="password"
            autoComplete="new-password"
            required
            label="New Password"
            placeholder="••••••••"
            error={errors.password?.message}
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            {...register('password')}
          />

          <FormInput
            id="passwordConfirm"
            type="password"
            autoComplete="new-password"
            required
            label="Confirm New Password"
            placeholder="••••••••"
            error={errors.passwordConfirm?.message}
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            {...register('passwordConfirm')}
          />
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            {isLoading ? 'Resetting password...' : 'Reset Password'}
          </Button>
        </div>
      </form>
    </div>
  );
}
