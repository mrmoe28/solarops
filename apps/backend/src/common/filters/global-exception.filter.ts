import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { v4 as uuidv4 } from 'uuid';

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

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const contextType = host.getType<GqlContextType>();

    if (contextType === 'graphql') {
      this.handleGraphQLException(exception, host);
    } else {
      this.handleHttpException(exception, host);
    }
  }

  private handleHttpException(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorId = uuidv4();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.extractMessage(exception);
    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorId,
      message,
    };

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        errorResponse.error = (exceptionResponse as any).error;
        errorResponse.details = (exceptionResponse as any).details;
      }
    }

    this.logError(errorId, exception, request);
    response.status(status).json(errorResponse);
  }

  private handleGraphQLException(exception: unknown, host: ArgumentsHost): void {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const errorId = uuidv4();

    this.logError(errorId, exception, context.req);

    let graphQLError: GraphQLError;

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = this.extractMessage(exception);

      graphQLError = new GraphQLError(message, {
        extensions: {
          code: this.getGraphQLErrorCode(status),
          statusCode: status,
          errorId,
          timestamp: new Date().toISOString(),
        },
      });
    } else if (exception instanceof GraphQLError) {
      graphQLError = exception;
    } else {
      const message = this.extractMessage(exception);
      graphQLError = new GraphQLError(message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          errorId,
          timestamp: new Date().toISOString(),
        },
      });
    }

    throw graphQLError;
  }

  private extractMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        return response;
      } else if (typeof response === 'object' && response !== null) {
        return (response as any).message || exception.message;
      }
    } else if (exception instanceof Error) {
      return exception.message;
    }
    return 'Internal server error';
  }

  private getGraphQLErrorCode(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_USER_INPUT';
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHENTICATED';
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'VALIDATION_ERROR';
      case HttpStatus.TOO_MANY_REQUESTS:
        return 'RATE_LIMITED';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }

  private logError(errorId: string, exception: unknown, request: any): void {
    const errorLog = {
      errorId,
      timestamp: new Date().toISOString(),
      url: request?.url || request?.body?.query || 'Unknown',
      method: request?.method || 'GraphQL',
      headers: request?.headers,
      userId: request?.user?.id || 'anonymous',
      ip: request?.ip || request?.connection?.remoteAddress,
    };

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      if (status >= 500) {
        this.logger.error('Server Error', exception.stack, errorLog);
      } else if (status >= 400) {
        this.logger.warn('Client Error', errorLog);
      }
    } else if (exception instanceof Error) {
      this.logger.error('Unhandled Error', exception.stack, errorLog);
    } else {
      this.logger.error('Unknown Error', errorLog);
    }
  }
}
