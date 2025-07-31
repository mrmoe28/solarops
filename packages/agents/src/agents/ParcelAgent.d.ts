import { BaseAgent, AgentConfig } from '../base/BaseAgent';
import { AgentResult, ParcelData } from '@solarops/shared';
export interface ParcelInput {
    address: string;
    city: string;
    state: string;
    zipCode: string;
}
export declare class ParcelAgent extends BaseAgent {
    constructor(config?: AgentConfig);
    execute(input: ParcelInput): Promise<AgentResult<Partial<ParcelData>>>;
    private generateMockParcelNumber;
}
//# sourceMappingURL=ParcelAgent.d.ts.map