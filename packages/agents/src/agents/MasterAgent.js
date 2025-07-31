import { AgentType } from '@solarops/shared';
import { PermitOfficeAgent } from './PermitOfficeAgent';
import { ParcelAgent } from './ParcelAgent';
import { OpenSolarAgent } from './OpenSolarAgent';
import { ProposalAgent } from './ProposalAgent';
import { EventEmitter } from 'events';
export class MasterAgent extends EventEmitter {
    config;
    permitAgent;
    parcelAgent;
    solarAgent;
    proposalAgent;
    constructor(config) {
        super();
        this.config = config;
        this.permitAgent = new PermitOfficeAgent(config);
        this.parcelAgent = new ParcelAgent(config);
        this.solarAgent = new OpenSolarAgent(config);
        this.proposalAgent = new ProposalAgent(config);
        this.setupAgentListeners();
    }
    async executeWorkflow(input) {
        const { project } = input;
        const results = { ...project };
        try {
            // Step 1: Gather permit information
            this.emit('agentStart', { agentType: AgentType.PERMIT_OFFICE });
            const permitResult = await this.permitAgent.execute({
                address: project.address,
                city: project.city,
                state: project.state,
                zipCode: project.zipCode,
            });
            if (permitResult.success && permitResult.data) {
                results.permitData = permitResult.data;
                this.emit('agentComplete', {
                    agentType: AgentType.PERMIT_OFFICE,
                    success: true,
                });
            }
            else {
                this.emit('agentError', {
                    agentType: AgentType.PERMIT_OFFICE,
                    error: permitResult.error,
                });
            }
            // Step 2: Gather parcel information
            this.emit('agentStart', { agentType: AgentType.PARCEL_INFO });
            const parcelResult = await this.parcelAgent.execute({
                address: project.address,
                city: project.city,
                state: project.state,
                zipCode: project.zipCode,
            });
            if (parcelResult.success && parcelResult.data) {
                results.parcelData = parcelResult.data;
                this.emit('agentComplete', {
                    agentType: AgentType.PARCEL_INFO,
                    success: true,
                });
            }
            else {
                this.emit('agentError', {
                    agentType: AgentType.PARCEL_INFO,
                    error: parcelResult.error,
                });
            }
            // Step 3: Create solar design
            this.emit('agentStart', { agentType: AgentType.OPEN_SOLAR });
            const solarResult = await this.solarAgent.execute({
                address: project.address,
                squareFootage: results.parcelData?.squareFootage,
                roofType: results.parcelData?.roofType,
                electricalPanel: results.parcelData?.electricalPanel,
            });
            if (solarResult.success && solarResult.data) {
                results.solarDesign = solarResult.data;
                this.emit('agentComplete', {
                    agentType: AgentType.OPEN_SOLAR,
                    success: true,
                });
            }
            else {
                this.emit('agentError', {
                    agentType: AgentType.OPEN_SOLAR,
                    error: solarResult.error,
                });
            }
            // Step 4: Generate proposal
            this.emit('agentStart', { agentType: AgentType.PROPOSAL });
            const proposalResult = await this.proposalAgent.execute({
                project: results,
            });
            if (proposalResult.success && proposalResult.data) {
                results.proposal = proposalResult.data;
                this.emit('agentComplete', {
                    agentType: AgentType.PROPOSAL,
                    success: true,
                });
            }
            else {
                this.emit('agentError', {
                    agentType: AgentType.PROPOSAL,
                    error: proposalResult.error,
                });
            }
            return {
                success: true,
                data: results,
            };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    code: 'WORKFLOW_FAILED',
                    message: 'Master agent workflow failed',
                    details: { error: error instanceof Error ? error.message : String(error) },
                    retryable: false,
                },
            };
        }
    }
    setupAgentListeners() {
        const agents = [this.permitAgent, this.parcelAgent, this.solarAgent, this.proposalAgent];
        agents.forEach((agent) => {
            agent.on('progress', (data) => {
                this.emit('agentProgress', {
                    agentType: agent.agentType,
                    ...data,
                });
            });
            agent.on('retry', (data) => {
                this.emit('agentRetry', {
                    agentType: agent.agentType,
                    ...data,
                });
            });
        });
    }
}
