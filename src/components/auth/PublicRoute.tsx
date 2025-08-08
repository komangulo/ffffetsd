import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function PublicRoute({ children, redirectTo = '/' }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Redirect to home if already authenticated
      const redirect = router.query.redirect as string | undefined;
      router.push(redirect || redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
