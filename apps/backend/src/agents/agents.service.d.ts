import { Queue } from 'bull';
import { PrismaService } from '../database/prisma.service';
import { ProjectsService } from '../projects/projects.service';
import { TaskStatus } from '@solarops/shared';
export declare class AgentsService {
    private prisma;
    private projectsService;
    private permitQueue;
    private parcelQueue;
    private solarQueue;
    private proposalQueue;
    constructor(prisma: PrismaService, projectsService: ProjectsService, permitQueue: Queue, parcelQueue: Queue, solarQueue: Queue, proposalQueue: Queue);
    startProjectAnalysis(projectId: string): Promise<{
        success: boolean;
        projectId: string;
    }>;
    getAgentTasks(projectId: string): Promise<{
        error: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TaskStatus;
        projectId: string;
        agentType: import("@prisma/client").$Enums.AgentType;
        input: import("@prisma/client/runtime/library").JsonValue | null;
        output: import("@prisma/client/runtime/library").JsonValue | null;
        attempts: number;
        startedAt: Date | null;
        completedAt: Date | null;
    }[]>;
    updateTaskStatus(taskId: string, status: TaskStatus, output?: any, error?: string): Promise<{
        error: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TaskStatus;
        projectId: string;
        agentType: import("@prisma/client").$Enums.AgentType;
        input: import("@prisma/client/runtime/library").JsonValue | null;
        output: import("@prisma/client/runtime/library").JsonValue | null;
        attempts: number;
        startedAt: Date | null;
        completedAt: Date | null;
    }>;
}
//# sourceMappingURL=agents.service.d.ts.map