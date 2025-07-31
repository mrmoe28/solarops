import { useEffect, useState, useCallback } from 'react';
import { extractErrorMessage } from '@/lib/apollo-error-link';
export function useErrorHandler() {
    const [errorState, setErrorState] = useState({
        error: null,
        message: null,
        isRetrying: false,
    });
    // Listen for Apollo errors
    useEffect(() => {
        const handleApolloError = (event) => {
            setErrorState({
                error: new Error(event.detail.message),
                message: event.detail.message,
                isRetrying: false,
            });
        };
        window.addEventListener('apollo-error', handleApolloError);
        return () => {
            window.removeEventListener('apollo-error', handleApolloError);
        };
    }, []);
    const handleError = useCallback((error) => {
        const message = extractErrorMessage(error);
        setErrorState({
            error,
            message,
            isRetrying: false,
        });
    }, []);
    const clearError = useCallback(() => {
        setErrorState({
            error: null,
            message: null,
            isRetrying: false,
        });
    }, []);
    const retry = useCallback((retryFn) => {
        setErrorState((prev) => ({ ...prev, isRetrying: true }));
        retryFn()
            .then(() => {
            clearError();
        })
            .catch((error) => {
            handleError(error);
        })
            .finally(() => {
            setErrorState((prev) => ({ ...prev, isRetrying: false }));
        });
    }, [clearError, handleError]);
    return {
        error: errorState.error,
        errorMessage: errorState.message,
        isRetrying: errorState.isRetrying,
        handleError,
        clearError,
        retry,
    };
}
// Hook for handling mutations with optimistic updates
export function useMutationErrorHandler() {
    const { handleError, clearError } = useErrorHandler();
    const handleMutationError = useCallback((error, rollback) => {
        // Rollback optimistic update if provided
        if (rollback) {
            rollback();
        }
        // Handle the error
        handleError(error);
    }, [handleError]);
    return {
        handleMutationError,
        clearError,
    };
}
