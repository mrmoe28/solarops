import { BaseAgent, AgentConfig } from '../base/BaseAgent';
import { AgentResult, PermitData } from '@solarops/shared';
export interface PermitOfficeInput {
    address: string;
    city: string;
    state: string;
    zipCode: string;
}
export declare class PermitOfficeAgent extends BaseAgent {
    private browser?;
    constructor(config?: AgentConfig);
    execute(input: PermitOfficeInput): Promise<AgentResult<Partial<PermitData>>>;
    private findPermitOffice;
    private scrapePermitInfo;
}
//# sourceMappingURL=PermitOfficeAgent.d.ts.map