'use client';

import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorDisplay } from '@/components/error/error-display';
import { FeatureErrorBoundary } from '@/components/error/feature-error-boundary';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock queries/mutations for testing
const FAIL_QUERY = gql`
  query FailQuery {
    failQuery
  }
`;

const FAIL_MUTATION = gql`
  mutation FailMutation {
    failMutation
  }
`;

// Component that throws errors
function ErrorThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('This is a simulated React component error!');
  }
  return <div className="p-4 bg-green-100 rounded">Component rendered successfully!</div>;
}

// Component demonstrating async errors
function AsyncErrorComponent() {
  const handleAsyncError = () => {
    // Simulate unhandled promise rejection
    Promise.reject(new Error('This is an unhandled async error!'));
  };

  const handleHandledAsyncError = async () => {
    try {
      await Promise.reject(new Error('This is a handled async error!'));
    } catch (error) {
      console.error('Caught async error:', error);
      alert('Async error was caught and handled properly!');
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleAsyncError} variant="destructive">
        Trigger Unhandled Async Error
      </Button>
      <Button onClick={handleHandledAsyncError} variant="outline">
        Trigger Handled Async Error
      </Button>
    </div>
  );
}

// Component demonstrating GraphQL errors
function GraphQLErrorComponent() {
  const { data, loading, error, refetch } = useQuery(FAIL_QUERY, {
    skip: true,
    errorPolicy: 'all',
  });

  const [mutate, { loading: mutating, error: mutationError }] = useMutation(FAIL_MUTATION);

  const triggerQueryError = () => {
    refetch();
  };

  const triggerMutationError = async () => {
    try {
      await mutate();
    } catch (err) {
      console.log('Mutation error caught:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={triggerQueryError} disabled={loading}>
          {loading ? 'Loading...' : 'Trigger Query Error'}
        </Button>
        <Button onClick={triggerMutationError} disabled={mutating} variant="outline">
          {mutating ? 'Mutating...' : 'Trigger Mutation Error'}
        </Button>
      </div>
      
      {error && <ErrorDisplay error={error} onRetry={triggerQueryError} />}
      {mutationError && <ErrorDisplay error={mutationError} />}
    </div>
  );
}

// Component demonstrating custom error handling
function CustomErrorHandling() {
  const { error, errorMessage, handleError, clearError, retry, isRetrying } = useErrorHandler();
  const [retryCount, setRetryCount] = useState(0);

  const simulateError = () => {
    handleError(new Error('This is a custom error handled by useErrorHandler hook!'));
  };

  const simulateRetryableError = () => {
    const failingOperation = async () => {
      setRetryCount((prev) => prev + 1);
      if (retryCount < 2) {
        throw new Error(`Retry attempt ${retryCount + 1} failed. Try again!`);
      }
      alert('Success after retries!');
      setRetryCount(0);
    };

    retry(failingOperation);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={simulateError}>Trigger Custom Error</Button>
        <Button onClick={simulateRetryableError} disabled={isRetrying} variant="outline">
          {isRetrying ? 'Retrying...' : 'Trigger Retryable Error'}
        </Button>
      </div>
      
      {errorMessage && (
        <ErrorDisplay 
          message={errorMessage} 
          onDismiss={clearError}
          onRetry={() => retry(async () => {
            // Simulate successful retry
            await new Promise(resolve => setTimeout(resolve, 1000));
          })}
        />
      )}
      
      {retryCount > 0 && (
        <p className="text-sm text-muted-foreground">
          Retry attempts: {retryCount}
        </p>
      )}
    </div>
  );
}

export default function ErrorDemoPage() {
  const [throwError, setThrowError] = useState(false);

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Error Handling Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates the various error handling mechanisms in the SolarOps application.
        </p>
      </div>

      <Tabs defaultValue="component" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="component">Component Errors</TabsTrigger>
          <TabsTrigger value="async">Async Errors</TabsTrigger>
          <TabsTrigger value="graphql">GraphQL Errors</TabsTrigger>
          <TabsTrigger value="custom">Custom Handling</TabsTrigger>
        </TabsList>

        <TabsContent value="component">
          <Card>
            <CardHeader>
              <CardTitle>React Component Errors</CardTitle>
              <CardDescription>
                Demonstrates error boundaries catching React component errors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FeatureErrorBoundary 
                featureName="Error Demo Feature"
                onRetry={() => setThrowError(false)}
              >
                <div className="space-y-4">
                  <Button 
                    onClick={() => setThrowError(!throwError)}
                    variant={throwError ? "destructive" : "default"}
                  >
                    {throwError ? 'Disable' : 'Enable'} Component Error
                  </Button>
                  
                  <ErrorThrowingComponent shouldThrow={throwError} />
                </div>
              </FeatureErrorBoundary>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="async">
          <Card>
            <CardHeader>
              <CardTitle>Async Error Handling</CardTitle>
              <CardDescription>
                Shows how unhandled promise rejections are caught by AsyncErrorBoundary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AsyncErrorComponent />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="graphql">
          <Card>
            <CardHeader>
              <CardTitle>GraphQL Error Handling</CardTitle>
              <CardDescription>
                Demonstrates Apollo Client error handling with retry logic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  Note: These will fail with network errors since the queries don't exist. 
                  This demonstrates how network errors are handled.
                </p>
              </div>
              <GraphQLErrorComponent />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Error Handling</CardTitle>
              <CardDescription>
                Shows usage of the useErrorHandler hook for custom error management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomErrorHandling />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Error Handling Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc list-inside">
            <li>Error boundaries for React component errors</li>
            <li>Async error boundary for unhandled promise rejections</li>
            <li>Apollo error link with retry logic and custom error handling</li>
            <li>User-friendly error display components</li>
            <li>Feature-specific error boundaries for isolated error handling</li>
            <li>Custom error handling hooks for flexible error management</li>
            <li>Automatic authentication error handling (redirects to login)</li>
            <li>Network error detection and offline state handling</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}