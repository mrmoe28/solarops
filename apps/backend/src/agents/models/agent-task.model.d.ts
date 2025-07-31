export declare enum AgentType {
    PERMIT_OFFICE = "PERMIT_OFFICE",
    PARCEL_INFO = "PARCEL_INFO",
    OPEN_SOLAR = "OPEN_SOLAR",
    PROPOSAL = "PROPOSAL"
}
export declare enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    RETRYING = "RETRYING"
}
export declare class AgentTask {
    id: string;
    projectId: string;
    agentType: AgentType;
    status: TaskStatus;
    input?: string;
    output?: string;
    error?: string;
    attempts: number;
    startedAt?: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=agent-task.model.d.ts.map