import { ApolloLink } from '@apollo/client/core';
interface RetryConfig {
    max: number;
    delay: number;
    jitter?: boolean;
}
export declare function createErrorLink(): ApolloLink;
export declare function createRetryLink(config?: RetryConfig): ApolloLink;
export declare function extractErrorMessage(error: any): string;
export {};
//# sourceMappingURL=apollo-error-link.d.ts.map