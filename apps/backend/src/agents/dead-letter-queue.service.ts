import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_NAMES } from '@solarops/shared';
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

@Injectable()
export class DeadLetterQueueService {
  private queues: Map<string, Queue> = new Map();

  constructor(
    @InjectQueue(QUEUE_NAMES.PERMIT_OFFICE) permitQueue: Queue,
    @InjectQueue(QUEUE_NAMES.PARCEL_INFO) parcelQueue: Queue,
    @InjectQueue(QUEUE_NAMES.OPEN_SOLAR) openSolarQueue: Queue,
    @InjectQueue(QUEUE_NAMES.PROPOSAL) proposalQueue: Queue,
    private logger: LoggerService,
  ) {
    this.queues.set(QUEUE_NAMES.PERMIT_OFFICE, permitQueue);
    this.queues.set(QUEUE_NAMES.PARCEL_INFO, parcelQueue);
    this.queues.set(QUEUE_NAMES.OPEN_SOLAR, openSolarQueue);
    this.queues.set(QUEUE_NAMES.PROPOSAL, proposalQueue);

    this.setupQueueEventHandlers();
  }

  private setupQueueEventHandlers(): void {
    this.queues.forEach((queue, queueName) => {
      queue.on('failed', async (job, err) => {
        this.logger.logQueueEvent(queueName, job.id.toString(), 'failed', {
          error: err.message,
          attemptsMade: job.attemptsMade,
          maxAttempts: job.opts.attempts,
        });

        // Check if job has exhausted all retries
        if (job.attemptsMade >= (job.opts.attempts || 1)) {
          await this.handleDeadLetterJob(queueName, job, err);
        }
      });

      queue.on('stalled', (job) => {
        this.logger.warn(`Job ${job.id} stalled in queue ${queueName}`, 'DeadLetterQueueService');
      });
    });
  }

  private async handleDeadLetterJob(
    queueName: string,
    job: any,
    error: Error,
  ): Promise<void> {
    this.logger.error(
      `Job ${job.id} moved to dead letter queue after ${job.attemptsMade} attempts`,
      error.stack,
      'DeadLetterQueueService',
    );

    // Here you could:
    // 1. Send notifications (email, Slack, etc.)
    // 2. Store in a separate database table for manual review
    // 3. Trigger alerts in monitoring systems
    
    // For now, we'll just ensure the job is kept for inspection
    job.update({ deadLetter: true, deadLetterReason: error.message });
  }

  async getFailedJobs(queueName?: string): Promise<FailedJob[]> {
    const queuesToCheck = queueName 
      ? [this.queues.get(queueName)].filter(Boolean)
      : Array.from(this.queues.values());

    const allFailedJobs: FailedJob[] = [];

    for (const queue of queuesToCheck) {
      if (!queue) continue;

      const failedJobs = await queue.getFailed();
      
      for (const job of failedJobs) {
        allFailedJobs.push({
          id: job.id.toString(),
          name: job.name,
          data: job.data,
          failedReason: job.failedReason || 'Unknown error',
          stacktrace: job.stacktrace,
          attemptsMade: job.attemptsMade,
          processedOn: job.processedOn,
          finishedOn: job.finishedOn,
          queue: queue.name,
        });
      }
    }

    return allFailedJobs;
  }

  async retryFailedJob(queueName: string, jobId: string): Promise<void> {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`Queue ${queueName} not found`);
    }

    const job = await queue.getJob(jobId);
    if (!job) {
      throw new Error(`Job ${jobId} not found in queue ${queueName}`);
    }

    // Reset the job state and retry
    await job.retry();
    
    this.logger.log(`Retrying failed job ${jobId} in queue ${queueName}`, 'DeadLetterQueueService');
  }

  async removeFailedJob(queueName: string, jobId: string): Promise<void> {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`Queue ${queueName} not found`);
    }

    const job = await queue.getJob(jobId);
    if (!job) {
      throw new Error(`Job ${jobId} not found in queue ${queueName}`);
    }

    await job.remove();
    
    this.logger.log(`Removed failed job ${jobId} from queue ${queueName}`, 'DeadLetterQueueService');
  }

  async getQueueStats(): Promise<Record<string, any>> {
    const stats: Record<string, any> = {};

    for (const [queueName, queue] of this.queues) {
      const [
        waiting,
        active,
        completed,
        failed,
        delayed,
        paused,
      ] = await Promise.all([
        queue.getWaitingCount(),
        queue.getActiveCount(),
        queue.getCompletedCount(),
        queue.getFailedCount(),
        queue.getDelayedCount(),
        queue.getPausedCount(),
      ]);

      stats[queueName] = {
        waiting,
        active,
        completed,
        failed,
        delayed,
        paused,
        total: waiting + active + completed + failed + delayed + paused,
      };
    }

    return stats;
  }

  async cleanFailedJobs(olderThanDays: number = 7): Promise<number> {
    const cutoffTime = Date.now() - (olderThanDays * 24 * 60 * 60 * 1000);
    let totalCleaned = 0;

    for (const [queueName, queue] of this.queues) {
      const failedJobs = await queue.getFailed();
      
      for (const job of failedJobs) {
        if (job.finishedOn && job.finishedOn < cutoffTime) {
          await job.remove();
          totalCleaned++;
        }
      }

      this.logger.log(`Cleaned ${totalCleaned} old failed jobs from ${queueName}`);
    }

    return totalCleaned;
  }
}