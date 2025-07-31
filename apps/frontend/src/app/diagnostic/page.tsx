'use client';

import { useEffect, useState } from 'react';

export default function DiagnosticPage() {
  const [mounted, setMounted] = useState(false);
  const [authData, setAuthData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Check localStorage
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const authStorage = localStorage.getItem('auth-storage');
      
      setAuthData({
        hasToken: !!token,
        hasUser: !!user,
        hasAuthStorage: !!authStorage,
        authStorage: authStorage ? JSON.parse(authStorage) : null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  if (!mounted) {
    return <div>Loading diagnostic...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">SolarOps Diagnostic Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-green-100 rounded">
          <h2 className="font-semibold">✅ Next.js is running</h2>
          <p>If you can see this, the Next.js app is working.</p>
        </div>

        <div className="p-4 bg-blue-100 rounded">
          <h2 className="font-semibold mb-2">Auth State Check:</h2>
          {error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : (
            <pre className="text-sm">{JSON.stringify(authData, null, 2)}</pre>
          )}
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Navigation Links:</h2>
          <div className="space-x-4">
            <a href="/" className="text-blue-600 underline">Home (with auth)</a>
            <a href="/test-page" className="text-blue-600 underline">Test Page</a>
            <a href="/auth/signin" className="text-blue-600 underline">Sign In</a>
            <a href="/error-demo" className="text-blue-600 underline">Error Demo</a>
          </div>
        </div>

        <div className="p-4 bg-yellow-100 rounded">
          <h2 className="font-semibold mb-2">Environment:</h2>
          <p>NODE_ENV: {process.env.NODE_ENV}</p>
          <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
          <p>WS URL: {process.env.NEXT_PUBLIC_WS_URL}</p>
        </div>
      </div>
    </div>
  );
}