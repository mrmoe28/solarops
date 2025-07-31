import { AgentType, AgentResult } from '@solarops/shared';
import { EventEmitter } from 'events';
export interface AgentConfig {
    maxRetries?: number;
    timeout?: number;
    onProgress?: (progress: number, message: string) => void;
}
export declare abstract class BaseAgent extends EventEmitter {
    protected agentType: AgentType;
    protected config: Required<AgentConfig>;
    constructor(agentType: AgentType, config?: AgentConfig);
    abstract execute(input: any): Promise<AgentResult>;
    protected executeWithRetry<T>(operation: () => Promise<T>, errorMessage: string): Promise<AgentResult<T>>;
    protected updateProgress(progress: number, message: string): void;
    protected sleep(ms: number): Promise<void>;
}
//# sourceMappingURL=BaseAgent.d.ts.map