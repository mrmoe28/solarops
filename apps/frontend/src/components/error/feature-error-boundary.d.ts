import React from 'react';
interface FeatureErrorBoundaryProps {
    children: React.ReactNode;
    featureName: string;
    onRetry?: () => void;
}
export declare function FeatureErrorBoundary({ children, featureName, onRetry }: FeatureErrorBoundaryProps): React.JSX.Element;
export {};
//# sourceMappingURL=feature-error-boundary.d.ts.map