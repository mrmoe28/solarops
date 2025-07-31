import { BaseAgent, AgentConfig } from '../base/BaseAgent';
import { AgentResult, SolarDesign } from '@solarops/shared';
export interface OpenSolarInput {
    address: string;
    squareFootage?: number;
    roofType?: string;
    electricalPanel?: string;
    monthlyElectricBill?: number;
}
export declare class OpenSolarAgent extends BaseAgent {
    constructor(config?: AgentConfig);
    execute(input: OpenSolarInput): Promise<AgentResult<Partial<SolarDesign>>>;
    private calculateSystemSize;
}
//# sourceMappingURL=OpenSolarAgent.d.ts.map