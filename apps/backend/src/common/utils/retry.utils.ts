export interface RetryOptions {
  maxAttempts: number;
  backoffMs: number;
  maxBackoffMs?: number;
  exponential?: boolean;
  jitter?: boolean;
  shouldRetry?: (error: any) => boolean;
}

export class RetryHelper {
  static async withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions,
  ): Promise<T> {
    const {
      maxAttempts,
      backoffMs,
      maxBackoffMs = 30000,
      exponential = true,
      jitter = true,
      shouldRetry = () => true,
    } = options;

    let lastError: any;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;

        // Check if we should retry this error
        if (!shouldRetry(error)) {
          throw error;
        }

        // Check if we've exhausted retries
        if (attempt === maxAttempts) {
          throw error;
        }

        // Calculate delay
        let delay = backoffMs;
        if (exponential) {
          delay = Math.min(backoffMs * Math.pow(2, attempt - 1), maxBackoffMs);
        }

        // Add jitter to prevent thundering herd
        if (jitter) {
          delay = delay * (0.5 + Math.random() * 0.5);
        }

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }

  static isRetryableError(error: any): boolean {
    // Network errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return true;
    }

    // HTTP status codes that are retryable
    if (error.response?.status) {
      const status = error.response.status;
      return status === 429 || status === 503 || status >= 500;
    }

    // Database connection errors
    if (error.code === 'P2002' || error.code === 'P2024') {
      return true;
    }

    return false;
  }
}

export const defaultRetryOptions: Record<string, RetryOptions> = {
  permitOfficeAgent: {
    maxAttempts: 3,
    backoffMs: 2000,
    exponential: true,
    jitter: true,
    shouldRetry: RetryHelper.isRetryableError,
  },
  parcelAgent: {
    maxAttempts: 2,
    backoffMs: 1000,
    exponential: true,
    jitter: true,
    shouldRetry: RetryHelper.isRetryableError,
  },
  openSolarAgent: {
    maxAttempts: 3,
    backoffMs: 3000,
    exponential: true,
    jitter: true,
    shouldRetry: RetryHelper.isRetryableError,
  },
  proposalAgent: {
    maxAttempts: 5,
    backoffMs: 3000,
    exponential: true,
    jitter: true,
    shouldRetry: RetryHelper.isRetryableError,
  },
  externalApi: {
    maxAttempts: 3,
    backoffMs: 1000,
    exponential: true,
    jitter: true,
    shouldRetry: RetryHelper.isRetryableError,
  },
};