import React from 'react';
interface ErrorDisplayProps {
    error?: Error | null;
    message?: string | null;
    onRetry?: () => void;
    onDismiss?: () => void;
    variant?: 'default' | 'destructive';
    className?: string;
}
export declare function ErrorDisplay({ error, message, onRetry, onDismiss, variant, className, }: ErrorDisplayProps): React.JSX.Element | null;
export declare function LoadingSpinner({ message }: {
    message?: string;
}): React.JSX.Element;
export declare function EmptyState({ title, description, action, }: {
    title?: string;
    description?: string;
    action?: React.ReactNode;
}): React.JSX.Element;
export {};
//# sourceMappingURL=error-display.d.ts.map