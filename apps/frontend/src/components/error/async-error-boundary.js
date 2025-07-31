'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, X } from 'lucide-react';
export function AsyncErrorBoundary({ children }) {
    const [asyncErrors, setAsyncErrors] = useState([]);
    useEffect(() => {
        const handleUnhandledRejection = (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            const error = new Error(event.reason?.message || 'An unhandled error occurred');
            error.stack = event.reason?.stack;
            const asyncError = {
                id: `${Date.now()}-${Math.random()}`,
                error,
                timestamp: new Date(),
            };
            setAsyncErrors((prev) => [...prev, asyncError]);
            // Prevent default browser error handling
            event.preventDefault();
        };
        window.addEventListener('unhandledrejection', handleUnhandledRejection);
        return () => {
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);
    const dismissError = (id) => {
        setAsyncErrors((prev) => prev.filter((error) => error.id !== id));
    };
    const dismissAll = () => {
        setAsyncErrors([]);
    };
    return (<>
      {children}
      
      {/* Error notifications */}
      {asyncErrors.length > 0 && (<div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
          {asyncErrors.length > 1 && (<div className="flex justify-end mb-2">
              <Button size="sm" variant="outline" onClick={dismissAll} className="text-xs">
                Dismiss all ({asyncErrors.length})
              </Button>
            </div>)}
          
          {asyncErrors.slice(-3).map((asyncError) => (<Alert key={asyncError.id} variant="destructive" className="shadow-lg animate-in slide-in-from-right">
              <AlertTriangle className="h-4 w-4"/>
              <AlertTitle className="flex items-center justify-between">
                <span>Unexpected Error</span>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => dismissError(asyncError.id)}>
                  <X className="h-4 w-4"/>
                </Button>
              </AlertTitle>
              <AlertDescription>
                <p className="text-sm">{asyncError.error.message}</p>
                {process.env.NODE_ENV === 'development' && (<details className="mt-2">
                    <summary className="text-xs cursor-pointer hover:underline">
                      Stack trace
                    </summary>
                    <pre className="mt-1 text-xs overflow-x-auto">
                      {asyncError.error.stack}
                    </pre>
                  </details>)}
              </AlertDescription>
            </Alert>))}
        </div>)}
    </>);
}
