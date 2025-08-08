import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { FormInput } from '@/components/ui/form/FormInput';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const ChangePasswordPage: NextPage = () => {
  const { changePassword } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      
      await changePassword(data.currentPassword, data.newPassword);
      
      setSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Head>
          <title>Change Password | Nexus</title>
          <meta name="description" content="Change your account password" />
        </Head>

        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to settings
            </button>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              Change Password
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update your account password.
            </p>
          </div>

          <div className="overflow-hidden bg-white shadow dark:bg-gray-800 sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {error && (
                <div className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900 dark:bg-opacity-20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        {error}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-6 rounded-md bg-green-50 p-4 dark:bg-green-900 dark:bg-opacity-20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                        Your password has been updated successfully.
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormInput
                    label="Current Password"
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    error={errors.currentPassword?.message}
                    {...register('currentPassword')}
                  />

                  <FormInput
                    label="New Password"
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    error={errors.newPassword?.message}
                    {...register('newPassword')}
                  />

                  <FormInput
                    label="Confirm New Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" isLoading={isLoading}>
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default ChangePasswordPage;
