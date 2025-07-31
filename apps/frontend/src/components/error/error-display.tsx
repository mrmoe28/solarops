import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';

interface ErrorDisplayProps {
  error?: Error | null;
  message?: string | null;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'default' | 'destructive';
  className?: string;
}

export function ErrorDisplay({
  error,
  message,
  onRetry,
  onDismiss,
  variant = 'destructive',
  className = '',
}: ErrorDisplayProps) {
  if (!error && !message) return null;

  const displayMessage = message || error?.message || 'An unexpected error occurred';

  return (
    <Alert variant={variant} className={className}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between">
        <span>Error</span>
        <div className="flex gap-2">
          {onRetry && (
            <Button
              size="sm"
              variant="outline"
              onClick={onRetry}
              className="h-7"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
          {onDismiss && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onDismiss}
              className="h-7 w-7 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </AlertTitle>
      <AlertDescription>{displayMessage}</AlertDescription>
    </Alert>
  );
}

// Loading state component
export function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p className="mt-4 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

// Empty state component
export function EmptyState({ 
  title = 'No data found',
  description,
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}