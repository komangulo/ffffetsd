import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/Button';
import { FormInput } from '@/components/ui/form/FormInput';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, User, Lock, Calendar, AlertCircle } from 'lucide-react';

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be at most 30 characters')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      ),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    passwordConfirm: z.string(),
    birthday: z.string().refine(
      (val) => {
        const date = new Date(val);
        const now = new Date();
        const minAgeDate = new Date(
          now.getFullYear() - 18,
          now.getMonth(),
          now.getDate()
        );
        return date <= minAgeDate;
      },
      {
        message: 'You must be at least 18 years old to register',
      }
    ),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register: authRegister } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      birthday: '',
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      
      await authRegister({
        username: data.username,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        birthday: data.birthday,
      });
      
      // Redirect to email verification page
      router.push('/verify-email');
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An error occurred during registration');
      
      // Handle specific error cases
      if (error.message.includes('email')) {
        setFormError('email', {
          type: 'manual',
          message: error.message,
        });
      } else if (error.message.includes('username')) {
        setFormError('username', {
          type: 'manual',
          message: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign in
          </Link>
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
            id="username"
            type="text"
            autoComplete="username"
            required
            label="Username"
            placeholder="johndoe"
            error={errors.username?.message}
            icon={<User className="h-5 w-5 text-gray-400" />}
            {...register('username')}
          />

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

          <FormInput
            id="password"
            type="password"
            autoComplete="new-password"
            required
            label="Password"
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
            label="Confirm Password"
            placeholder="••••••••"
            error={errors.passwordConfirm?.message}
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            {...register('passwordConfirm')}
          />

          <FormInput
            id="birthday"
            type="date"
            required
            label="Date of Birth"
            error={errors.birthday?.message}
            icon={<Calendar className="h-5 w-5 text-gray-400" />}
            {...register('birthday')}
          />
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              {...register('terms')}
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              I agree to the{' '}
              <Link
                href="/terms"
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Privacy Policy
              </Link>
            </label>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-600">
                {errors.terms.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          By creating an account, you agree to our{' '}
          <Link
            href="/terms"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
