import { BaseAgent, AgentConfig } from '../base/BaseAgent';
import { AgentResult, Proposal, Project } from '@solarops/shared';
export interface ProposalInput {
    project: Project;
    electricityRate?: number;
    annualRateIncrease?: number;
}
export declare class ProposalAgent extends BaseAgent {
    constructor(config?: AgentConfig);
    execute(input: ProposalInput): Promise<AgentResult<Partial<Proposal>>>;
    private calculateSystemCost;
    private calculateMaterialCost;
    private calculateSavings;
}
//# sourceMappingURL=ProposalAgent.d.ts.map