import { AgentsService } from './agents.service';
export declare class AgentsResolver {
    private agentsService;
    constructor(agentsService: AgentsService);
    startProjectAnalysis(projectId: string): Promise<boolean>;
    agentTasks(projectId: string): Promise<{
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
    agentTaskUpdated(_projectId: string): any;
    publishTaskUpdate(task: any): Promise<void>;
}
//# sourceMappingURL=agents.resolver.d.ts.map