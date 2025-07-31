import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export interface ErrorResponse {
    statusCode: number;
    timestamp: string;
    path: string;
    method: string;
    errorId: string;
    message: string;
    error?: string;
    details?: any;
}
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: unknown, host: ArgumentsHost): void;
    private handleHttpException;
    private handleGraphQLException;
    private extractMessage;
    private getGraphQLErrorCode;
    private logError;
}
//# sourceMappingURL=global-exception.filter.d.ts.map