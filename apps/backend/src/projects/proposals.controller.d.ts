import { Response } from 'express';
import { User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
export declare class ProposalsController {
    private prisma;
    constructor(prisma: PrismaService);
    downloadProposal(token: string, user: User, res: Response): Promise<void>;
    private generateProposalPDF;
}
//# sourceMappingURL=proposals.controller.d.ts.map