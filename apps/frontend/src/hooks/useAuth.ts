import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';

export function useAuth() {
  const { user, isAuthenticated, isLoading, hasHydrated, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    if (hasHydrated) {
      checkAuth();
    }
  }, [checkAuth, hasHydrated]);

  return {
    user,
    loading: !hasHydrated || isLoading,
    isAuthenticated,
    signOut: logout,
  };
}
