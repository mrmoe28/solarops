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
export interface AgentTask {
    id: string;
    projectId: string;
    agentType: AgentType;
    status: TaskStatus;
    input?: Record<string, any>;
    output?: Record<string, any>;
    error?: string;
    attempts: number;
    startedAt?: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface AgentProgress {
    projectId: string;
    agentType: AgentType;
    status: TaskStatus;
    progress: number;
    message: string;
    details?: Record<string, any>;
}
export interface AgentResult<T = any> {
    success: boolean;
    data?: T;
    error?: AgentError;
}
export interface AgentError {
    code: string;
    message: string;
    details?: Record<string, any>;
    retryable: boolean;
}
//# sourceMappingURL=agent.d.ts.map