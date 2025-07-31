import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../logger/logger.service';
export declare class LoggingInterceptor implements NestInterceptor {
    private logger;
    constructor(logger: LoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private handleHttpRequest;
    private handleGraphQLRequest;
}
//# sourceMappingURL=logging.interceptor.d.ts.map