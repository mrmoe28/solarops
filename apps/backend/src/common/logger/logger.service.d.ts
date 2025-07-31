import { LoggerService as NestLoggerService } from '@nestjs/common';
export declare class LoggerService implements NestLoggerService {
    private logger;
    private correlationId;
    constructor();
    private createLogger;
    setCorrelationId(correlationId: string): void;
    log(message: string, context?: string): void;
    error(message: string, trace?: string, context?: string): void;
    warn(message: string, context?: string): void;
    debug(message: string, context?: string): void;
    verbose(message: string, context?: string): void;
    logRequest(method: string, url: string, userId?: string, duration?: number): void;
    logDatabaseQuery(query: string, duration: number, params?: any): void;
    logExternalApiCall(service: string, endpoint: string, method: string, statusCode?: number, duration?: number): void;
    logAgentExecution(agentType: string, taskId: string, status: 'started' | 'completed' | 'failed', duration?: number, error?: any): void;
    logQueueEvent(queueName: string, jobId: string, event: 'added' | 'processing' | 'completed' | 'failed' | 'retrying', data?: any): void;
    logSecurityEvent(eventType: 'login' | 'logout' | 'auth_failed' | 'permission_denied', userId?: string, details?: any): void;
    logPerformanceMetric(metric: string, value: number, unit: 'ms' | 'count' | 'bytes' | 'percent', tags?: Record<string, string>): void;
}
//# sourceMappingURL=logger.service.d.ts.map