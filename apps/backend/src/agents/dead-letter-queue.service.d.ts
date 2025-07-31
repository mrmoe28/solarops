import { Queue } from 'bull';
import { LoggerService } from '../common/logger/logger.service';
export interface FailedJob {
    id: string;
    name: string;
    data: any;
    failedReason: string;
    stacktrace: string[];
    attemptsMade: number;
    processedOn?: number;
    finishedOn?: number;
    queue: string;
}
export declare class DeadLetterQueueService {
    private logger;
    private queues;
    constructor(permitQueue: Queue, parcelQueue: Queue, openSolarQueue: Queue, proposalQueue: Queue, logger: LoggerService);
    private setupQueueEventHandlers;
    private handleDeadLetterJob;
    getFailedJobs(queueName?: string): Promise<FailedJob[]>;
    retryFailedJob(queueName: string, jobId: string): Promise<void>;
    removeFailedJob(queueName: string, jobId: string): Promise<void>;
    getQueueStats(): Promise<Record<string, any>>;
    cleanFailedJobs(olderThanDays?: number): Promise<number>;
}
//# sourceMappingURL=dead-letter-queue.service.d.ts.map