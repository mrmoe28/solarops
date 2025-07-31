'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { AuthGuard } from '@/components/auth/auth-guard';
import { ThemeProvider } from '@/contexts/theme-context';
import { ErrorBoundary } from '@/components/error/error-boundary';
import { AsyncErrorBoundary } from '@/components/error/async-error-boundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AsyncErrorBoundary>
        <ThemeProvider defaultTheme="system">
          <ApolloProvider client={apolloClient}>
            <AuthGuard>{children}</AuthGuard>
          </ApolloProvider>
        </ThemeProvider>
      </AsyncErrorBoundary>
    </ErrorBoundary>
  );
}
