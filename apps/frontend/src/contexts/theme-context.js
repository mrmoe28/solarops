'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(undefined);
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
function getSystemTheme() {
    if (typeof window === 'undefined')
        return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function getResolvedTheme(theme) {
    if (theme === 'system') {
        return getSystemTheme();
    }
    return theme;
}
export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'solarops-theme', }) {
    const [theme, setThemeState] = useState(defaultTheme);
    const [resolvedTheme, setResolvedTheme] = useState(() => getResolvedTheme(defaultTheme));
    const [mounted, setMounted] = useState(false);
    // Handle initial theme load from localStorage
    useEffect(() => {
        setMounted(true);
        try {
            const savedTheme = localStorage.getItem(storageKey);
            if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
                setThemeState(savedTheme);
                setResolvedTheme(getResolvedTheme(savedTheme));
            }
        }
        catch (error) {
            console.error('Error loading theme from localStorage:', error);
        }
    }, [storageKey]);
    // Apply theme class to document
    useEffect(() => {
        if (!mounted)
            return;
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);
    }, [resolvedTheme, mounted]);
    // Listen for system theme changes
    useEffect(() => {
        if (!mounted || theme !== 'system')
            return;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            setResolvedTheme(getSystemTheme());
        };
        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
        else {
            // Legacy browsers
            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeListener(handleChange);
        }
    }, [theme, mounted]);
    const setTheme = (newTheme) => {
        try {
            localStorage.setItem(storageKey, newTheme);
        }
        catch (error) {
            console.error('Error saving theme to localStorage:', error);
        }
        setThemeState(newTheme);
        setResolvedTheme(getResolvedTheme(newTheme));
    };
    // Prevent hydration mismatch by not rendering theme-dependent content until mounted
    if (!mounted) {
        return (<ThemeContext.Provider value={{
                theme: defaultTheme,
                resolvedTheme: 'light', // Default to light to match server
                setTheme: () => { },
            }}>
        {children}
      </ThemeContext.Provider>);
    }
    return (<ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>);
}
