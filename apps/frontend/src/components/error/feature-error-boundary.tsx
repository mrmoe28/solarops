'use client';

import React from 'react';
import { ErrorBoundary } from './error-boundary';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface FeatureErrorBoundaryProps {
  children: React.ReactNode;
  featureName: string;
  onRetry?: () => void;
}

export function FeatureErrorBoundary({ 
  children, 
  featureName,
  onRetry 
}: FeatureErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <Card className="p-6 m-4">
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-yellow-100 p-2">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {featureName} Error
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  This feature encountered an error. You can continue using other parts of the
                  application.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    reset();
                    onRetry?.();
                  }}
                >
                  <RefreshCw className="mr-2 h-3 w-3" />
                  Retry
                </Button>
                <Button size="sm" variant="outline" onClick={reset}>
                  Dismiss
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                    Error details
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                    {error.message}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </Card>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}