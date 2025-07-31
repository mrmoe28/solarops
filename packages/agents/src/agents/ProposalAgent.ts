import { BaseAgent, AgentConfig } from '../base/BaseAgent';
import { AgentType, AgentResult, Proposal, Project, SolarDesign } from '@solarops/shared';

export interface ProposalInput {
  project: Project;
  electricityRate?: number; // $/kWh
  annualRateIncrease?: number; // percentage
}

export class ProposalAgent extends BaseAgent {
  constructor(config?: AgentConfig) {
    super(AgentType.PROPOSAL, config);
  }

  async execute(input: ProposalInput): Promise<AgentResult<Partial<Proposal>>> {
    return this.executeWithRetry(async () => {
      this.updateProgress(0, 'Generating proposal...');

      const { project } = input;
      const electricityRate = input.electricityRate || 0.15; // Default $0.15/kWh
      const annualRateIncrease = input.annualRateIncrease || 3; // Default 3% annual increase

      if (!project.solarDesign) {
        throw new Error('Solar design is required to generate proposal');
      }

      this.updateProgress(30, 'Calculating system costs...');
      const systemCost = this.calculateSystemCost(project.solarDesign);

      this.updateProgress(60, 'Calculating savings projections...');
      const savings = this.calculateSavings(
        project.solarDesign,
        systemCost,
        electricityRate,
        annualRateIncrease,
      );

      this.updateProgress(80, 'Calculating payback period...');
      const paybackPeriod = systemCost / savings.annual;

      const proposal: Partial<Proposal> = {
        systemCost,
        savings,
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      };

      this.updateProgress(100, 'Proposal generated successfully');
      return proposal;
    }, 'Failed to generate proposal');
  }

  private calculateSystemCost(solarDesign: SolarDesign): number {
    if (!solarDesign.bomList) {
      // Rough estimate: $3 per watt installed
      return solarDesign.systemSize * 1000 * 3;
    }

    const materialCost = this.calculateMaterialCost(solarDesign.bomList);
    const laborCost = materialCost * 0.3; // Labor is typically 30% of material cost
    const permitAndInspection = 500; // Flat fee estimate
    const margin = (materialCost + laborCost) * 0.2; // 20% margin

    return Math.round(materialCost + laborCost + permitAndInspection + margin);
  }

  private calculateMaterialCost(bomList: any): number {
    let total = 0;

    for (const category of Object.values(bomList)) {
      if (Array.isArray(category)) {
        total += category.reduce((sum, item) => sum + item.totalPrice, 0);
      }
    }

    return total;
  }

  private calculateSavings(
    solarDesign: SolarDesign,
    systemCost: number,
    electricityRate: number,
    annualRateIncrease: number,
  ): { monthly: number; annual: number; lifetime: number } {
    const annualProduction = solarDesign.annualProduction || 0;
    const firstYearSavings = annualProduction * electricityRate;

    // Calculate 25-year lifetime savings with rate increases
    let lifetimeSavings = 0;
    let currentRate = electricityRate;

    for (let year = 0; year < 25; year++) {
      lifetimeSavings += annualProduction * currentRate * 0.995; // 0.5% annual degradation
      currentRate *= 1 + annualRateIncrease / 100;
    }

    return {
      monthly: Math.round(firstYearSavings / 12),
      annual: Math.round(firstYearSavings),
      lifetime: Math.round(lifetimeSavings),
    };
  }
}
