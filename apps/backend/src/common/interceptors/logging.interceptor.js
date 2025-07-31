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
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
let LoggingInterceptor = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LoggingInterceptor = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LoggingInterceptor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger;
        constructor(logger) {
            this.logger = logger;
        }
        intercept(context, next) {
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
            }
            catch {
                // Not a GraphQL context, continue
            }
            return next.handle();
        }
        handleHttpRequest(context, next, start, correlationId) {
            const request = context.switchToHttp().getRequest();
            const { method, url, body } = request;
            const userId = request.user?.id;
            // Add correlation ID to request
            request.correlationId = correlationId;
            this.logger.log(`Incoming ${method} request to ${url}`, LoggingInterceptor.name);
            if (process.env.LOG_LEVEL === 'debug') {
                this.logger.debug(`Request body: ${JSON.stringify(body)}`, LoggingInterceptor.name);
            }
            return next.handle().pipe(tap({
                next: (_data) => {
                    const duration = Date.now() - start;
                    this.logger.logRequest(method, url, userId, duration);
                },
                error: (error) => {
                    const duration = Date.now() - start;
                    this.logger.error(`Request failed: ${error.message}`, error.stack, LoggingInterceptor.name);
                    this.logger.logRequest(method, url, userId, duration);
                },
            }));
        }
        handleGraphQLRequest(context, next, start, correlationId) {
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
            this.logger.log(`GraphQL ${operationType}: ${operationName}`, LoggingInterceptor.name);
            if (process.env.LOG_LEVEL === 'debug') {
                this.logger.debug(`Variables: ${JSON.stringify(ctx.getArgs())}`, LoggingInterceptor.name);
            }
            return next.handle().pipe(tap({
                next: () => {
                    const duration = Date.now() - start;
                    this.logger.logRequest(`GraphQL ${operationType}`, operationName, userId, duration);
                },
                error: (error) => {
                    const duration = Date.now() - start;
                    this.logger.error(`GraphQL operation failed: ${error.message}`, error.stack, LoggingInterceptor.name);
                    this.logger.logRequest(`GraphQL ${operationType}`, operationName, userId, duration);
                },
            }));
        }
    };
    return LoggingInterceptor = _classThis;
})();
export { LoggingInterceptor };
