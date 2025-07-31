import { ApolloLink, Observable } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
const DEFAULT_RETRY_CONFIG = {
    max: 3,
    delay: 1000,
    jitter: true,
};
export function createErrorLink() {
    return onError(({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach((error) => {
                const { message, extensions, path } = error;
                console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`, extensions);
                // Handle specific error codes
                if (extensions?.code === 'UNAUTHENTICATED') {
                    // Clear auth token and redirect to login
                    localStorage.removeItem('token');
                    window.location.href = '/auth/signin';
                }
                if (extensions?.code === 'FORBIDDEN') {
                    // Show permission denied message
                    showErrorNotification('You do not have permission to perform this action');
                }
            });
        }
        if (networkError) {
            console.error(`[Network error]: ${networkError}`);
            // Handle offline scenarios
            if (!navigator.onLine) {
                showErrorNotification('You are offline. Please check your internet connection.');
            }
            else {
                showErrorNotification('Network error. Please try again.');
            }
        }
    });
}
export function createRetryLink(config = DEFAULT_RETRY_CONFIG) {
    return new ApolloLink((operation, forward) => {
        return new Observable((observer) => {
            let retryCount = 0;
            let retryTimer;
            const tryOperation = () => {
                forward(operation).subscribe({
                    next: (data) => {
                        observer.next(data);
                    },
                    error: (error) => {
                        if (shouldRetry(error, retryCount, config.max)) {
                            retryCount++;
                            const delay = calculateDelay(retryCount, config);
                            console.log(`Retrying operation ${operation.operationName} (attempt ${retryCount}/${config.max})`);
                            retryTimer = setTimeout(tryOperation, delay);
                        }
                        else {
                            observer.error(error);
                        }
                    },
                    complete: () => {
                        observer.complete();
                    },
                });
            };
            tryOperation();
            return () => {
                if (retryTimer) {
                    clearTimeout(retryTimer);
                }
            };
        });
    });
}
function shouldRetry(error, retryCount, maxRetries) {
    // Don't retry if we've exceeded max attempts
    if (retryCount >= maxRetries) {
        return false;
    }
    // Don't retry GraphQL errors (except specific cases)
    if (error.graphQLErrors?.length > 0) {
        const retriableErrorCodes = ['INTERNAL_SERVER_ERROR', 'SERVICE_UNAVAILABLE'];
        return error.graphQLErrors.some((gqlError) => retriableErrorCodes.includes(gqlError.extensions?.code));
    }
    // Retry network errors
    if (error.networkError) {
        // Don't retry if offline
        if (!navigator.onLine) {
            return false;
        }
        // Retry on specific network errors
        const retriableNetworkErrors = ['NetworkError', 'ServerError'];
        return retriableNetworkErrors.some((errorType) => error.networkError.message?.includes(errorType));
    }
    return false;
}
function calculateDelay(retryCount, config) {
    let delay = config.delay * Math.pow(2, retryCount - 1);
    if (config.jitter) {
        // Add jitter to prevent thundering herd
        delay = delay * (0.5 + Math.random() * 0.5);
    }
    return Math.min(delay, 30000); // Cap at 30 seconds
}
function showErrorNotification(message) {
    // This would integrate with your notification system
    // For now, we'll dispatch a custom event that can be handled by the app
    const event = new CustomEvent('apollo-error', { detail: { message } });
    window.dispatchEvent(event);
}
// Helper to extract user-friendly error messages
export function extractErrorMessage(error) {
    // Check GraphQL errors
    if (error.graphQLErrors?.length > 0) {
        return error.graphQLErrors[0].message;
    }
    // Check network errors
    if (error.networkError) {
        if (!navigator.onLine) {
            return 'You are offline. Please check your internet connection.';
        }
        return 'A network error occurred. Please try again.';
    }
    // Default message
    return 'An unexpected error occurred. Please try again.';
}
