import { AgentType, AgentResult, AgentError, TaskStatus } from '@solarops/shared';
import pRetry from 'p-retry';
import { EventEmitter } from 'events';

export interface AgentConfig {
  maxRetries?: number;
  timeout?: number;
  onProgress?: (progress: number, message: string) => void;
}

export abstract class BaseAgent extends EventEmitter {
  protected agentType: AgentType;
  protected config: Required<AgentConfig>;

  constructor(agentType: AgentType, config: AgentConfig = {}) {
    super();
    this.agentType = agentType;
    this.config = {
      maxRetries: config.maxRetries ?? 3,
      timeout: config.timeout ?? 300000, // 5 minutes
      onProgress: config.onProgress ?? (() => {}),
    };
  }

  abstract execute(input: any): Promise<AgentResult>;

  protected async executeWithRetry<T>(
    operation: () => Promise<T>,
    errorMessage: string,
  ): Promise<AgentResult<T>> {
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
    } catch (error) {
      const agentError: AgentError = {
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

  protected updateProgress(progress: number, message: string) {
    this.config.onProgress(progress, message);
    this.emit('progress', { progress, message });
  }

  protected async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
