'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// Add debug logging
if (typeof window !== 'undefined') {
  console.log('AuthGuard component loaded');
}

const publicPaths = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
  '/terms',
  '/privacy',
];

const exactPublicPaths = ['/'];

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [timeoutReached, setTimeoutReached] = useState(false);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('AuthGuard - Timeout reached, forcing render');
      setTimeoutReached(true);
    }, 5000); // 5 second timeout

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log(
      'AuthGuard - loading:',
      loading,
      'isAuthenticated:',
      isAuthenticated,
      'pathname:',
      pathname,
    );

    // Only perform auth checks after hydration is complete
    if (!loading) {
      const isPublicPath = 
        publicPaths.some((path) => pathname.startsWith(path)) || 
        exactPublicPaths.includes(pathname);
      console.log('AuthGuard - isPublicPath:', isPublicPath);

      if (!isAuthenticated && !isPublicPath) {
        // Redirect to signin if trying to access protected route
        console.log('AuthGuard - Redirecting to signin');
        router.push('/auth/signin');
      } else if (isAuthenticated && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
        // Redirect to projects if already authenticated
        console.log('AuthGuard - Redirecting to projects');
        router.push('/projects');
      }
    }
  }, [isAuthenticated, loading, pathname, router]);

  // Show loading state while auth is being checked
  if (loading && !timeoutReached) {
    console.log('AuthGuard - Still loading, showing loading state');
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  console.log('AuthGuard - Rendering children');
  return <>{children}</>;
}
