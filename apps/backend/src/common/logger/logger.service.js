var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { v4 as uuidv4 } from 'uuid';
let LoggerService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LoggerService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LoggerService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger;
        correlationId;
        constructor() {
            this.correlationId = uuidv4();
            this.logger = this.createLogger();
        }
        createLogger() {
            const format = winston.format.combine(winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.json(), winston.format.printf((info) => {
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
            }));
            const transports = [
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple()),
                }),
            ];
            // Add file transports in production
            if (process.env.NODE_ENV === 'production') {
                // Error logs
                transports.push(new DailyRotateFile({
                    filename: 'logs/error-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    level: 'error',
                    maxSize: '20m',
                    maxFiles: '14d',
                    format,
                }));
                // Combined logs
                transports.push(new DailyRotateFile({
                    filename: 'logs/combined-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxSize: '20m',
                    maxFiles: '7d',
                    format,
                }));
            }
            return winston.createLogger({
                level: process.env.LOG_LEVEL || 'info',
                format,
                transports,
                exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
                rejectionHandlers: [new winston.transports.File({ filename: 'logs/rejections.log' })],
            });
        }
        setCorrelationId(correlationId) {
            this.correlationId = correlationId;
        }
        log(message, context) {
            this.logger.info(message, { context, correlationId: this.correlationId });
        }
        error(message, trace, context) {
            this.logger.error(message, {
                context,
                correlationId: this.correlationId,
                trace,
            });
        }
        warn(message, context) {
            this.logger.warn(message, { context, correlationId: this.correlationId });
        }
        debug(message, context) {
            this.logger.debug(message, { context, correlationId: this.correlationId });
        }
        verbose(message, context) {
            this.logger.verbose(message, { context, correlationId: this.correlationId });
        }
        // Additional structured logging methods
        logRequest(method, url, userId, duration) {
            this.logger.info('HTTP Request', {
                type: 'http_request',
                method,
                url,
                userId,
                duration,
                correlationId: this.correlationId,
            });
        }
        logDatabaseQuery(query, duration, params) {
            this.logger.debug('Database Query', {
                type: 'database_query',
                query,
                duration,
                params,
                correlationId: this.correlationId,
            });
        }
        logExternalApiCall(service, endpoint, method, statusCode, duration) {
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
        logAgentExecution(agentType, taskId, status, duration, error) {
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
        logQueueEvent(queueName, jobId, event, data) {
            this.logger.info('Queue Event', {
                type: 'queue_event',
                queueName,
                jobId,
                event,
                data,
                correlationId: this.correlationId,
            });
        }
        logSecurityEvent(eventType, userId, details) {
            this.logger.warn('Security Event', {
                type: 'security_event',
                eventType,
                userId,
                details,
                correlationId: this.correlationId,
            });
        }
        logPerformanceMetric(metric, value, unit, tags) {
            this.logger.info('Performance Metric', {
                type: 'performance_metric',
                metric,
                value,
                unit,
                tags,
                correlationId: this.correlationId,
            });
        }
    };
    return LoggerService = _classThis;
})();
export { LoggerService };
