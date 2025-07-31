import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useAuthStore = create()(persist((set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    hasHydrated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setToken: (token) => set({ token }),
    setLoading: (loading) => set({ isLoading: loading }),
    setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    login: (user, token) => {
        set({ user, token, isAuthenticated: true });
        // Also update localStorage for Apollo client
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },
    logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    checkAuth: async () => {
        console.log('checkAuth called');
        try {
            // Only check localStorage on client side
            if (typeof window === 'undefined') {
                console.log('checkAuth - server side, skipping');
                set({ isLoading: false, hasHydrated: true });
                return;
            }
            const token = get().token || localStorage.getItem('token');
            const userStr = localStorage.getItem('user');
            console.log('checkAuth - token exists:', !!token, 'user exists:', !!userStr);
            if (token && userStr) {
                try {
                    const user = JSON.parse(userStr);
                    console.log('checkAuth - setting authenticated user');
                    set({ user, token, isAuthenticated: true, isLoading: false, hasHydrated: true });
                }
                catch (_error) {
                    // Invalid user data in localStorage
                    console.log('checkAuth - invalid user data in localStorage');
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                        hasHydrated: true,
                    });
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            else {
                console.log('checkAuth - no auth data found');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    hasHydrated: true,
                });
            }
        }
        catch (error) {
            // Ensure loading state is always resolved
            console.log('checkAuth - error:', error);
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                hasHydrated: true,
            });
        }
    },
}), {
    name: 'auth-storage',
    partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
    }),
    onRehydrateStorage: () => (state) => {
        console.log('onRehydrateStorage called, state exists:', !!state);
        if (state) {
            state.setHasHydrated(true);
            state.setLoading(false);
        }
    },
}));
