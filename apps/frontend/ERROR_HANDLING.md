# Error Handling Guide for SolarOps Frontend

This guide explains how to use the comprehensive error handling system implemented in the SolarOps frontend application.

## Overview

The error handling system consists of several components:

1. **Error Boundaries** - Catch React component errors
2. **Apollo Error Link** - Handle GraphQL errors with retry logic
3. **Async Error Boundary** - Catch unhandled promise rejections
4. **Error Display Components** - User-friendly error UI
5. **Error Hooks** - Custom error handling logic

## Error Boundaries

### Global Error Boundary

The global error boundary is already set up in `app/providers.tsx` and wraps the entire application:

```tsx
<ErrorBoundary>
  <AsyncErrorBoundary>
    {/* Your app */}
  </AsyncErrorBoundary>
</ErrorBoundary>
```

### Feature Error Boundary

Use for isolating errors in specific features:

```tsx
import { FeatureErrorBoundary } from '@/components/error/feature-error-boundary';

function MyFeature() {
  return (
    <FeatureErrorBoundary 
      featureName="Project Dashboard"
      onRetry={() => window.location.reload()}
    >
      {/* Feature components */}
    </FeatureErrorBoundary>
  );
}
```

## GraphQL Error Handling

The Apollo Client is configured with automatic error handling and retry logic:

### Query Error Handling

```tsx
const { data, loading, error, refetch } = useQuery(MY_QUERY, {
  errorPolicy: 'all', // Continue even if there are errors
});

if (error) {
  return <ErrorDisplay error={error} onRetry={() => refetch()} />;
}
```

### Mutation Error Handling

```tsx
const [mutate, { loading, error }] = useMutation(MY_MUTATION, {
  onError: (error) => {
    // Custom error handling
    console.error('Mutation failed:', error);
  },
});

// In your component
{error && <ErrorDisplay error={error} />}
```

## Using the Error Handler Hook

The `useErrorHandler` hook provides centralized error management:

```tsx
import { useErrorHandler } from '@/hooks/useErrorHandler';

function MyComponent() {
  const { error, errorMessage, handleError, clearError, retry, isRetrying } = useErrorHandler();

  const performAction = async () => {
    try {
      await someAsyncOperation();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      {errorMessage && (
        <ErrorDisplay 
          message={errorMessage}
          onDismiss={clearError}
          onRetry={() => retry(performAction)}
        />
      )}
      
      <Button onClick={performAction} disabled={isRetrying}>
        {isRetrying ? 'Retrying...' : 'Perform Action'}
      </Button>
    </div>
  );
}
```

## Error Display Components

### Basic Error Display

```tsx
import { ErrorDisplay } from '@/components/error/error-display';

// With error object
<ErrorDisplay 
  error={error}
  onRetry={() => refetch()}
  onDismiss={() => setError(null)}
/>

// With custom message
<ErrorDisplay 
  message="Something went wrong"
  variant="destructive"
/>
```

### Loading and Empty States

```tsx
import { LoadingSpinner, EmptyState } from '@/components/error/error-display';

// Loading state
if (loading) return <LoadingSpinner message="Loading projects..." />;

// Empty state
if (!data?.projects?.length) {
  return (
    <EmptyState 
      title="No projects found"
      description="Create your first project to get started"
      action={<Button>Create Project</Button>}
    />
  );
}
```

## Apollo Error Link Features

The Apollo error link automatically handles:

1. **Authentication Errors** - Redirects to login on 401/UNAUTHENTICATED
2. **Permission Errors** - Shows user-friendly messages for 403/FORBIDDEN
3. **Network Errors** - Detects offline state and shows appropriate messages
4. **Retry Logic** - Automatically retries failed requests with exponential backoff

### Retry Configuration

```tsx
// In apollo-client.ts
const retryLink = createRetryLink({
  max: 3,          // Maximum retry attempts
  delay: 1000,     // Initial delay in ms
  jitter: true,    // Add random jitter to prevent thundering herd
});
```

## Best Practices

1. **Always handle loading and error states** in components that fetch data
2. **Use error boundaries** to prevent entire app crashes
3. **Provide retry mechanisms** for transient errors
4. **Show user-friendly messages** instead of technical errors
5. **Log errors** for debugging (already configured in error boundaries)
6. **Test error scenarios** using the error demo page at `/error-demo`

## Error Types and Handling

### Network Errors
- Automatically detected and retried
- Shows offline message when no internet connection
- Provides retry button for user action

### GraphQL Errors
- Handled by Apollo error link
- Specific handling for auth and permission errors
- Extracted user-friendly messages

### Component Errors
- Caught by error boundaries
- Shows fallback UI with retry option
- Logs to console in development

### Async Errors
- Unhandled promise rejections caught by AsyncErrorBoundary
- Shows dismissible notifications
- Prevents browser error dialogs

## Testing Error Handling

Visit `/error-demo` to test all error handling scenarios:

1. Component errors with error boundaries
2. Async errors and unhandled rejections
3. GraphQL query and mutation errors
4. Custom error handling with hooks

## Integration with Backend

The error handling system works seamlessly with the backend error patterns:

- Task status updates are preserved on errors
- Consistent error message format
- Proper error codes (UNAUTHENTICATED, FORBIDDEN, etc.)
- Structured error responses with extensions

## Environment-Specific Features

### Development
- Full stack traces in error displays
- Detailed error information
- Console logging for debugging

### Production
- User-friendly error messages only
- Error reporting to monitoring services
- No sensitive information exposed