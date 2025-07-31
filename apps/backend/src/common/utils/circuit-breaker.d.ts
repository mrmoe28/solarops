import { LoggerService } from '../logger/logger.service';
export declare enum CircuitState {
    CLOSED = "CLOSED",
    OPEN = "OPEN",
    HALF_OPEN = "HALF_OPEN"
}
export interface CircuitBreakerOptions {
    failureThreshold: number;
    resetTimeout: number;
    halfOpenMaxAttempts: number;
    monitoringPeriod: number;
}
export declare class CircuitBreaker {
    private readonly name;
    private readonly options;
    private readonly logger;
    private state;
    private failureCount;
    private successCount;
    private lastFailureTime?;
    private halfOpenAttempts;
    private requestCount;
    private monitoringStartTime;
    constructor(name: string, options: CircuitBreakerOptions, logger: LoggerService);
    execute<T>(fn: () => Promise<T>): Promise<T>;
    private shouldAttemptReset;
    private onSuccess;
    private onFailure;
    private transitionToOpen;
    private transitionToHalfOpen;
    private transitionToClosed;
    getState(): CircuitState;
    getStats(): {
        state: CircuitState;
        failureCount: number;
        successCount: number;
        requestCount: number;
        lastFailureTime: Date | undefined;
    };
}
export declare class CircuitBreakerService {
    private readonly logger;
    private readonly breakers;
    constructor(logger: LoggerService);
    getBreaker(name: string, options?: Partial<CircuitBreakerOptions>): CircuitBreaker;
    getAllStats(): Record<string, any>;
}
//# sourceMappingURL=circuit-breaker.d.ts.map