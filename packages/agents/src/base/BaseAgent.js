import pRetry from 'p-retry';
import { EventEmitter } from 'events';
export class BaseAgent extends EventEmitter {
    agentType;
    config;
    constructor(agentType, config = {}) {
        super();
        this.agentType = agentType;
        this.config = {
            maxRetries: config.maxRetries ?? 3,
            timeout: config.timeout ?? 300000, // 5 minutes
            onProgress: config.onProgress ?? (() => { }),
        };
    }
    async executeWithRetry(operation, errorMessage) {
        try {
            const result = await pRetry(operation, {
                retries: this.config.maxRetries,
                onFailedAttempt: (error) => {
                    this.emit('retry', {
                        attemptNumber: error.attemptNumber,
                        retriesLeft: error.retriesLeft,
                        error: error.message,
                    });
                },
            });
            return {
                success: true,
                data: result,
            };
        }
        catch (error) {
            const agentError = {
                code: 'AGENT_EXECUTION_FAILED',
                message: errorMessage,
                details: { originalError: error instanceof Error ? error.message : String(error) },
                retryable: false,
            };
            return {
                success: false,
                error: agentError,
            };
        }
    }
    updateProgress(progress, message) {
        this.config.onProgress(progress, message);
        this.emit('progress', { progress, message });
    }
    async sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
