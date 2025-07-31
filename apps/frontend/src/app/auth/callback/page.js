'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuthStore();
    useEffect(() => {
        const handleCallback = async () => {
            const token = searchParams.get('token');
            const error = searchParams.get('error');
            const provider = searchParams.get('provider');
            if (error) {
                // Redirect to sign in with error
                router.push(`/auth/signin?error=${error}`);
                return;
            }
            if (token) {
                try {
                    // Store token first
                    localStorage.setItem('token', token);
                    // Make a request to get user data using the token
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            query: `
                query GetCurrentUser {
                  me {
                    id
                    email
                    name
                  }
                }
              `,
                        }),
                    });
                    const data = await response.json();
                    if (data.data?.me) {
                        const user = data.data.me;
                        login(user, token);
                        // Redirect to projects page or where user intended to go
                        const returnUrl = searchParams.get('returnUrl') || '/projects';
                        router.push(returnUrl);
                    }
                    else {
                        throw new Error('Failed to fetch user data');
                    }
                }
                catch (error) {
                    console.error('Failed to process auth token:', error);
                    router.push('/auth/signin?error=invalid_token');
                }
            }
            else {
                // No token or error, redirect to sign in
                router.push('/auth/signin');
            }
        };
        handleCallback();
    }, [searchParams, router, login]);
    return (<div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            <h2 className="text-xl font-semibold">Completing sign in...</h2>
            <p className="text-sm text-gray-600">Please wait while we log you in.</p>
          </div>
        </CardContent>
      </Card>
    </div>);
}
