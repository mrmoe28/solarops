import { HttpException } from '@nestjs/common';
export declare class ValidationException extends HttpException {
    constructor(message: string, errors?: Record<string, string[]>);
}
export declare class BusinessLogicException extends HttpException {
    constructor(message: string, code?: string);
}
export declare class ExternalServiceException extends HttpException {
    constructor(service: string, message: string, originalError?: any);
}
export declare class QueueProcessingException extends HttpException {
    constructor(jobId: string, message: string, retryable?: boolean);
}
export declare class AuthorizationException extends HttpException {
    constructor(message?: string);
}
export declare class RateLimitException extends HttpException {
    constructor(retryAfter: number);
}
export declare class ResourceNotFoundException extends HttpException {
    constructor(resource: string, identifier: string | number);
}
export declare class ConflictException extends HttpException {
    constructor(message: string, conflictingResource?: string);
}
//# sourceMappingURL=index.d.ts.map