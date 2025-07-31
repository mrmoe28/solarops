'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
export function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth/signin');
        }
    }, [isAuthenticated, loading, router]);
    if (loading) {
        return (<div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>);
    }
    if (!isAuthenticated) {
        return null;
    }
    return <>{children}</>;
}
