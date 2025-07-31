import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const correlationId = uuidv4();

    // Set correlation ID for this request
    this.logger.setCorrelationId(correlationId);

    const contextType = context.getType();

    if (contextType === 'http') {
      return this.handleHttpRequest(context, next, start, correlationId);
    }

    // Check if it's a GraphQL context
    try {
      const gqlContext = GqlExecutionContext.create(context);
      if (gqlContext.getInfo()) {
        return this.handleGraphQLRequest(context, next, start, correlationId);
      }
    } catch (error) {
      // Not a GraphQL context, continue
    }

    return next.handle();
  }

  private handleHttpRequest(
    context: ExecutionContext,
    next: CallHandler,
    start: number,
    correlationId: string,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, headers } = request;
    const userId = request.user?.id;

    // Add correlation ID to request
    request.correlationId = correlationId;

    this.logger.log(
      `Incoming ${method} request to ${url}`,
      LoggingInterceptor.name,
    );

    if (process.env.LOG_LEVEL === 'debug') {
      this.logger.debug(
        `Request body: ${JSON.stringify(body)}`,
        LoggingInterceptor.name,
      );
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - start;
          this.logger.logRequest(method, url, userId, duration);
        },
        error: (error) => {
          const duration = Date.now() - start;
          this.logger.error(
            `Request failed: ${error.message}`,
            error.stack,
            LoggingInterceptor.name,
          );
          this.logger.logRequest(method, url, userId, duration);
        },
      }),
    );
  }

  private handleGraphQLRequest(
    context: ExecutionContext,
    next: CallHandler,
    start: number,
    correlationId: string,
  ): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const info = ctx.getInfo();
    const userId = request?.user?.id;

    // Add correlation ID to context
    if (request) {
      request.correlationId = correlationId;
    }

    const operationType = info.operation.operation;
    const operationName = info.fieldName;

    this.logger.log(
      `GraphQL ${operationType}: ${operationName}`,
      LoggingInterceptor.name,
    );

    if (process.env.LOG_LEVEL === 'debug') {
      this.logger.debug(
        `Variables: ${JSON.stringify(ctx.getArgs())}`,
        LoggingInterceptor.name,
      );
    }

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          this.logger.logRequest(
            `GraphQL ${operationType}`,
            operationName,
            userId,
            duration,
          );
        },
        error: (error) => {
          const duration = Date.now() - start;
          this.logger.error(
            `GraphQL operation failed: ${error.message}`,
            error.stack,
            LoggingInterceptor.name,
          );
          this.logger.logRequest(
            `GraphQL ${operationType}`,
            operationName,
            userId,
            duration,
          );
        },
      }),
    );
  }
}