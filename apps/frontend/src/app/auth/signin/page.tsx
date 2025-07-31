'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '@/lib/graphql/queries';
import { signInSchema, type SignInFormData } from '@/lib/validations/auth';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SocialLoginButtons } from '@/components/auth/social-login-buttons';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();

  // Check for OAuth configuration errors from URL params
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');
    
    if (errorParam === 'oauth_not_configured') {
      setError('Google OAuth is not configured. Please contact the administrator.');
    } else if (errorParam === 'oauth_failed') {
      setError('Google OAuth authentication failed. Please try again.');
    }
  }, []);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      if (data.signIn.token) {
        login(data.signIn.user, data.signIn.token);
        router.push('/projects');
      }
    },
    onError: (error) => {
      setError(error.message || 'An error occurred during sign in');
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setError(null);
    try {
      await signIn({
        variables: {
          input: data,
        },
      });
    } catch (err) {
      // Error is handled by onError callback
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">Sign in to your SolarOps account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SocialLoginButtons />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div className="text-sm text-red-600 text-center">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-600">
        <div>
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
        <Link href="/auth/forgot-password" className="text-primary hover:underline">
          Forgot your password?
        </Link>
      </CardFooter>
    </Card>
  );
}
