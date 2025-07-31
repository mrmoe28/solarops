import { BaseAgent } from '../base/BaseAgent';
import { AgentType } from '@solarops/shared';
export class OpenSolarAgent extends BaseAgent {
    constructor(config) {
        super(AgentType.OPEN_SOLAR, config);
    }
    async execute(input) {
        return this.executeWithRetry(async () => {
            this.updateProgress(0, 'Initializing solar design process...');
            // In a real implementation, this would integrate with OpenSolar API
            this.updateProgress(20, 'Analyzing roof space and orientation...');
            await this.sleep(2000);
            this.updateProgress(40, 'Calculating optimal system size...');
            await this.sleep(1500);
            this.updateProgress(60, 'Selecting components...');
            await this.sleep(1500);
            this.updateProgress(80, 'Generating bill of materials...');
            await this.sleep(1000);
            // Mock solar design data
            const systemSize = this.calculateSystemSize(input.squareFootage || 2000);
            const panelCount = Math.ceil(systemSize / 0.4); // 400W panels
            const bomList = {
                panels: [
                    {
                        name: 'REC Alpha Pure 400W',
                        quantity: panelCount,
                        unitPrice: 280,
                        totalPrice: panelCount * 280,
                        partNumber: 'REC400AA',
                    },
                ],
                inverters: [
                    {
                        name: 'Enphase IQ8A Microinverter',
                        quantity: panelCount,
                        unitPrice: 145,
                        totalPrice: panelCount * 145,
                        partNumber: 'IQ8A-72-2-US',
                    },
                ],
                mounting: [
                    {
                        name: 'IronRidge XR Rail Kit',
                        quantity: Math.ceil(panelCount / 4),
                        unitPrice: 120,
                        totalPrice: Math.ceil(panelCount / 4) * 120,
                        partNumber: 'XR-100-168B',
                    },
                ],
                electrical: [
                    {
                        name: 'AC Combiner Panel',
                        quantity: 1,
                        unitPrice: 450,
                        totalPrice: 450,
                        partNumber: 'ENV-IQ-AM1-240',
                    },
                    {
                        name: 'AC Disconnect',
                        quantity: 1,
                        unitPrice: 85,
                        totalPrice: 85,
                        partNumber: 'DG221NRB',
                    },
                ],
                other: [
                    {
                        name: 'Monitoring Gateway',
                        quantity: 1,
                        unitPrice: 575,
                        totalPrice: 575,
                        partNumber: 'ENV-S-WM-230',
                    },
                ],
            };
            const solarDesign = {
                systemSize,
                panelCount,
                panelModel: 'REC Alpha Pure 400W',
                inverterModel: 'Enphase IQ8A',
                annualProduction: systemSize * 1400, // Rough estimate: 1400 kWh/kW/year
                bomList,
            };
            this.updateProgress(100, 'Solar design completed successfully');
            return solarDesign;
        }, 'Failed to generate solar design');
    }
    calculateSystemSize(squareFootage) {
        // Rough calculation: 1kW per 100 sq ft of roof space
        // Assuming 75% of roof is usable
        const usableRoofSpace = squareFootage * 0.75;
        const systemSize = Math.round((usableRoofSpace / 100) * 10) / 10;
        return Math.min(systemSize, 15); // Cap at 15kW for residential
    }
}
