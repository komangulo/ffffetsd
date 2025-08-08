import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/Button';
import { FormInput } from '@/components/ui/form/FormInput';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to send reset email');
      }
      
      setIsSubmitted(true);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Check your email
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We've sent you a password reset link. Please check your email and follow the instructions to reset your password.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Didn't receive an email? Check your spam folder or{' '}
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            onClick={() => setIsSubmitted(false)}
          >
            try again
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Forgot your password?
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
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
            id="email"
            type="email"
            autoComplete="email"
            required
            label="Email address"
            placeholder="you@example.com"
            error={errors.email?.message}
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            {...register('email')}
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
            {isLoading ? 'Sending...' : 'Send reset link'}
          </Button>
        </div>
      </form>

      <div className="text-center text-sm">
        <a
          href="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Back to sign in
        </a>
      </div>
    </div>
  );
}
