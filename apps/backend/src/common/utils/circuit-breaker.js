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
export var CircuitState;
(function (CircuitState) {
    CircuitState["CLOSED"] = "CLOSED";
    CircuitState["OPEN"] = "OPEN";
    CircuitState["HALF_OPEN"] = "HALF_OPEN";
})(CircuitState || (CircuitState = {}));
export class CircuitBreaker {
    name;
    options;
    logger;
    state = CircuitState.CLOSED;
    failureCount = 0;
    successCount = 0;
    lastFailureTime;
    halfOpenAttempts = 0;
    requestCount = 0;
    monitoringStartTime = Date.now();
    constructor(name, options, logger) {
        this.name = name;
        this.options = options;
        this.logger = logger;
    }
    async execute(fn) {
        if (this.state === CircuitState.OPEN) {
            if (this.shouldAttemptReset()) {
                this.transitionToHalfOpen();
            }
            else {
                throw new Error(`Circuit breaker is OPEN for ${this.name}. Service is unavailable.`);
            }
        }
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        }
        catch (error) {
            this.onFailure();
            throw error;
        }
    }
    shouldAttemptReset() {
        if (!this.lastFailureTime)
            return false;
        const timeSinceLastFailure = Date.now() - this.lastFailureTime.getTime();
        return timeSinceLastFailure >= this.options.resetTimeout;
    }
    onSuccess() {
        this.requestCount++;
        if (this.state === CircuitState.HALF_OPEN) {
            this.successCount++;
            if (this.successCount >= this.options.halfOpenMaxAttempts) {
                this.transitionToClosed();
            }
        }
        else if (this.state === CircuitState.CLOSED) {
            // Reset failure count on success in closed state
            this.failureCount = 0;
        }
    }
    onFailure() {
        this.requestCount++;
        this.lastFailureTime = new Date();
        if (this.state === CircuitState.HALF_OPEN) {
            this.transitionToOpen();
        }
        else if (this.state === CircuitState.CLOSED) {
            this.failureCount++;
            // Calculate failure rate within monitoring period
            const monitoringDuration = Date.now() - this.monitoringStartTime;
            if (monitoringDuration > this.options.monitoringPeriod) {
                // Reset monitoring period
                this.monitoringStartTime = Date.now();
                this.failureCount = 1;
                this.requestCount = 1;
            }
            else if (this.failureCount >= this.options.failureThreshold) {
                this.transitionToOpen();
            }
        }
    }
    transitionToOpen() {
        this.state = CircuitState.OPEN;
        this.logger.warn(`Circuit breaker ${this.name} transitioned to OPEN state`, 'CircuitBreaker');
    }
    transitionToHalfOpen() {
        this.state = CircuitState.HALF_OPEN;
        this.halfOpenAttempts = 0;
        this.successCount = 0;
        this.logger.log(`Circuit breaker ${this.name} transitioned to HALF_OPEN state`);
    }
    transitionToClosed() {
        this.state = CircuitState.CLOSED;
        this.failureCount = 0;
        this.successCount = 0;
        this.halfOpenAttempts = 0;
        this.logger.log(`Circuit breaker ${this.name} transitioned to CLOSED state`);
    }
    getState() {
        return this.state;
    }
    getStats() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            successCount: this.successCount,
            requestCount: this.requestCount,
            lastFailureTime: this.lastFailureTime,
        };
    }
}
let CircuitBreakerService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CircuitBreakerService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CircuitBreakerService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger;
        breakers = new Map();
        constructor(logger) {
            this.logger = logger;
        }
        getBreaker(name, options) {
            if (!this.breakers.has(name)) {
                const defaultOptions = {
                    failureThreshold: 5,
                    resetTimeout: 60000, // 1 minute
                    halfOpenMaxAttempts: 3,
                    monitoringPeriod: 120000, // 2 minutes
                    ...options,
                };
                const breaker = new CircuitBreaker(name, defaultOptions, this.logger);
                this.breakers.set(name, breaker);
            }
            return this.breakers.get(name);
        }
        getAllStats() {
            const stats = {};
            this.breakers.forEach((breaker, name) => {
                stats[name] = breaker.getStats();
            });
            return stats;
        }
    };
    return CircuitBreakerService = _classThis;
})();
export { CircuitBreakerService };
