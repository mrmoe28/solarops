import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: winston.Logger;
  private correlationId: string;

  constructor() {
    this.correlationId = uuidv4();
    this.logger = this.createLogger();
  }

  private createLogger(): winston.Logger {
    const format = winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json(),
      winston.format.printf((info) => {
        const { timestamp, level, message, context, correlationId, ...meta } = info;

        const log = {
          timestamp,
          level,
          message,
          context,
          correlationId: correlationId || this.correlationId,
          ...meta,
        };

        return JSON.stringify(log);
      }),
    );

    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.simple(),
        ),
      }),
    ];

    // Add file transports in production
    if (process.env.NODE_ENV === 'production') {
      // Error logs
      transports.push(
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxSize: '20m',
          maxFiles: '14d',
          format,
        }),
      );

      // Combined logs
      transports.push(
        new DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '7d',
          format,
        }),
      );
    }

    return winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format,
      transports,
      exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
      rejectionHandlers: [new winston.transports.File({ filename: 'logs/rejections.log' })],
    });
  }

  setCorrelationId(correlationId: string) {
    this.correlationId = correlationId;
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context, correlationId: this.correlationId });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, {
      context,
      correlationId: this.correlationId,
      trace,
    });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context, correlationId: this.correlationId });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context, correlationId: this.correlationId });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context, correlationId: this.correlationId });
  }

  // Additional structured logging methods
  logRequest(method: string, url: string, userId?: string, duration?: number) {
    this.logger.info('HTTP Request', {
      type: 'http_request',
      method,
      url,
      userId,
      duration,
      correlationId: this.correlationId,
    });
  }

  logDatabaseQuery(query: string, duration: number, params?: any) {
    this.logger.debug('Database Query', {
      type: 'database_query',
      query,
      duration,
      params,
      correlationId: this.correlationId,
    });
  }

  logExternalApiCall(
    service: string,
    endpoint: string,
    method: string,
    statusCode?: number,
    duration?: number,
  ) {
    this.logger.info('External API Call', {
      type: 'external_api',
      service,
      endpoint,
      method,
      statusCode,
      duration,
      correlationId: this.correlationId,
    });
  }

  logAgentExecution(
    agentType: string,
    taskId: string,
    status: 'started' | 'completed' | 'failed',
    duration?: number,
    error?: any,
  ) {
    const level = status === 'failed' ? 'error' : 'info';
    this.logger.log(level, 'Agent Execution', {
      type: 'agent_execution',
      agentType,
      taskId,
      status,
      duration,
      error,
      correlationId: this.correlationId,
    });
  }

  logQueueEvent(
    queueName: string,
    jobId: string,
    event: 'added' | 'processing' | 'completed' | 'failed' | 'retrying',
    data?: any,
  ) {
    this.logger.info('Queue Event', {
      type: 'queue_event',
      queueName,
      jobId,
      event,
      data,
      correlationId: this.correlationId,
    });
  }

  logSecurityEvent(
    eventType: 'login' | 'logout' | 'auth_failed' | 'permission_denied',
    userId?: string,
    details?: any,
  ) {
    this.logger.warn('Security Event', {
      type: 'security_event',
      eventType,
      userId,
      details,
      correlationId: this.correlationId,
    });
  }

  logPerformanceMetric(
    metric: string,
    value: number,
    unit: 'ms' | 'count' | 'bytes' | 'percent',
    tags?: Record<string, string>,
  ) {
    this.logger.info('Performance Metric', {
      type: 'performance_metric',
      metric,
      value,
      unit,
      tags,
      correlationId: this.correlationId,
    });
  }
}
