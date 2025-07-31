import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(message: string, errors?: Record<string, string[]>) {
    super(
      {
        message,
        error: 'Validation Error',
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        details: errors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class BusinessLogicException extends HttpException {
  constructor(message: string, code?: string) {
    super(
      {
        message,
        error: 'Business Logic Error',
        statusCode: HttpStatus.BAD_REQUEST,
        code,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class ExternalServiceException extends HttpException {
  constructor(service: string, message: string, originalError?: any) {
    super(
      {
        message: `External service error: ${message}`,
        error: 'External Service Error',
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        service,
        details: originalError,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}

export class QueueProcessingException extends HttpException {
  constructor(jobId: string, message: string, retryable = true) {
    super(
      {
        message: `Queue processing error: ${message}`,
        error: 'Queue Processing Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        jobId,
        retryable,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class AuthorizationException extends HttpException {
  constructor(message = 'You do not have permission to perform this action') {
    super(
      {
        message,
        error: 'Authorization Error',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class RateLimitException extends HttpException {
  constructor(retryAfter: number) {
    super(
      {
        message: 'Too many requests. Please try again later.',
        error: 'Rate Limit Exceeded',
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        retryAfter,
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}

export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, identifier: string | number) {
    super(
      {
        message: `${resource} with identifier '${identifier}' not found`,
        error: 'Resource Not Found',
        statusCode: HttpStatus.NOT_FOUND,
        resource,
        identifier,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, conflictingResource?: string) {
    super(
      {
        message,
        error: 'Conflict',
        statusCode: HttpStatus.CONFLICT,
        conflictingResource,
      },
      HttpStatus.CONFLICT,
    );
  }
}
