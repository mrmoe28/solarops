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
import { Catch, HttpException, HttpStatus, Logger, } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { v4 as uuidv4 } from 'uuid';
let GlobalExceptionFilter = (() => {
    let _classDecorators = [Catch()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GlobalExceptionFilter = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GlobalExceptionFilter = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = new Logger(GlobalExceptionFilter.name);
        catch(exception, host) {
            const contextType = host.getType();
            if (contextType === 'graphql') {
                this.handleGraphQLException(exception, host);
            }
            else {
                this.handleHttpException(exception, host);
            }
        }
        handleHttpException(exception, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const request = ctx.getRequest();
            const errorId = uuidv4();
            const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
            const message = this.extractMessage(exception);
            const errorResponse = {
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
                    errorResponse.error = exceptionResponse.error;
                    errorResponse.details = exceptionResponse.details;
                }
            }
            this.logError(errorId, exception, request);
            response.status(status).json(errorResponse);
        }
        handleGraphQLException(exception, host) {
            const gqlHost = GqlArgumentsHost.create(host);
            const context = gqlHost.getContext();
            const errorId = uuidv4();
            this.logError(errorId, exception, context.req);
            let graphQLError;
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
            }
            else if (exception instanceof GraphQLError) {
                graphQLError = exception;
            }
            else {
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
        extractMessage(exception) {
            if (exception instanceof HttpException) {
                const response = exception.getResponse();
                if (typeof response === 'string') {
                    return response;
                }
                else if (typeof response === 'object' && response !== null) {
                    return response.message || exception.message;
                }
            }
            else if (exception instanceof Error) {
                return exception.message;
            }
            return 'Internal server error';
        }
        getGraphQLErrorCode(status) {
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
        logError(errorId, exception, request) {
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
                }
                else if (status >= 400) {
                    this.logger.warn('Client Error', errorLog);
                }
            }
            else if (exception instanceof Error) {
                this.logger.error('Unhandled Error', exception.stack, errorLog);
            }
            else {
                this.logger.error('Unknown Error', errorLog);
            }
        }
    };
    return GlobalExceptionFilter = _classThis;
})();
export { GlobalExceptionFilter };
