import { Job } from 'bull';
import { AgentsService } from './agents.service';
import { PrismaService } from '../database/prisma.service';
import { LoggerService } from '../common/logger/logger.service';
export declare class PermitOfficeProcessor {
    private agentsService;
    private prisma;
    private logger;
    constructor(agentsService: AgentsService, prisma: PrismaService, logger: LoggerService);
    process(job: Job): Promise<void>;
}
export declare class ParcelInfoProcessor {
    private agentsService;
    private prisma;
    constructor(agentsService: AgentsService, prisma: PrismaService);
    process(job: Job): Promise<void>;
}
export declare class OpenSolarProcessor {
    private agentsService;
    private prisma;
    constructor(agentsService: AgentsService, prisma: PrismaService);
    process(job: Job): Promise<void>;
}
export declare class ProposalProcessor {
    private agentsService;
    private prisma;
    constructor(agentsService: AgentsService, prisma: PrismaService);
    process(job: Job): Promise<void>;
}
export declare const AgentProcessors: (typeof PermitOfficeProcessor | typeof ParcelInfoProcessor | typeof OpenSolarProcessor | typeof ProposalProcessor)[];
//# sourceMappingURL=agent.processors.d.ts.map