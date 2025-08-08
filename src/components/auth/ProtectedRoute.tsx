import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.push(`${redirectTo}?redirect=${encodeURIComponent(router.asPath)}`);
    } else if (!isLoading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      // Redirect to home if user doesn't have required role
      router.push('/');
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router, redirectTo]);

  if (isLoading || !isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
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
