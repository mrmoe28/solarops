export interface RetryOptions {
    maxAttempts: number;
    backoffMs: number;
    maxBackoffMs?: number;
    exponential?: boolean;
    jitter?: boolean;
    shouldRetry?: (error: any) => boolean;
}
export declare class RetryHelper {
    static withRetry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T>;
    static isRetryableError(error: any): boolean;
}
export declare const defaultRetryOptions: Record<string, RetryOptions>;
//# sourceMappingURL=retry.utils.d.ts.map