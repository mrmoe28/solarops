import { ApolloError } from '@apollo/client';
export interface ErrorState {
    error: Error | ApolloError | null;
    message: string | null;
    isRetrying: boolean;
}
export declare function useErrorHandler(): {
    error: Error | ApolloError | null;
    errorMessage: string | null;
    isRetrying: boolean;
    handleError: (error: Error | ApolloError) => void;
    clearError: () => void;
    retry: (retryFn: () => Promise<any>) => void;
};
export declare function useMutationErrorHandler(): {
    handleMutationError: (error: ApolloError, rollback?: () => void) => void;
    clearError: () => void;
};
//# sourceMappingURL=useErrorHandler.d.ts.map