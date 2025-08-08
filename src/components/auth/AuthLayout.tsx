import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireNoAuth?: boolean;
  redirectTo?: string;
}

export function AuthLayout({
  children,
  requireAuth = false,
  requireNoAuth = false,
  redirectTo = '/',
}: AuthLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
      } else if (requireNoAuth && isAuthenticated) {
        router.push(redirectTo);
      }
    }
  }, [isLoading, isAuthenticated, requireAuth, requireNoAuth, redirectTo, router]);

  if (isLoading || (requireAuth && !isAuthenticated) || (requireNoAuth && isAuthenticated)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <svg
              className="h-12 w-12 text-indigo-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 8V20L12 22L20 20V8L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L20 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L4 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Nexus
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            A secure community for kink and BDSM enthusiasts
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow dark:bg-gray-800 sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>

      <footer className="mt-auto py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Nexus. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6 text-sm">
            <a
              href="/privacy"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Terms
            </a>
            <a
              href="/contact"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
