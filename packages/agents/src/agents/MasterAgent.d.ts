import { AgentConfig } from '../base/BaseAgent';
import { AgentResult, Project } from '@solarops/shared';
import { EventEmitter } from 'events';
export interface MasterAgentInput {
    project: Project;
}
export declare class MasterAgent extends EventEmitter {
    private config?;
    private permitAgent;
    private parcelAgent;
    private solarAgent;
    private proposalAgent;
    constructor(config?: AgentConfig | undefined);
    executeWorkflow(input: MasterAgentInput): Promise<AgentResult<Project>>;
    private setupAgentListeners;
}
//# sourceMappingURL=MasterAgent.d.ts.map