var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES } from '@solarops/shared';
let DeadLetterQueueService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DeadLetterQueueService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DeadLetterQueueService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger;
        queues = new Map();
        constructor(permitQueue, parcelQueue, openSolarQueue, proposalQueue, logger) {
            this.logger = logger;
            this.queues.set(QUEUE_NAMES.PERMIT_OFFICE, permitQueue);
            this.queues.set(QUEUE_NAMES.PARCEL_INFO, parcelQueue);
            this.queues.set(QUEUE_NAMES.OPEN_SOLAR, openSolarQueue);
            this.queues.set(QUEUE_NAMES.PROPOSAL, proposalQueue);
            this.setupQueueEventHandlers();
        }
        setupQueueEventHandlers() {
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
        async handleDeadLetterJob(queueName, job, error) {
            this.logger.error(`Job ${job.id} moved to dead letter queue after ${job.attemptsMade} attempts`, error.stack, 'DeadLetterQueueService');
            // Here you could:
            // 1. Send notifications (email, Slack, etc.)
            // 2. Store in a separate database table for manual review
            // 3. Trigger alerts in monitoring systems
            // For now, we'll just ensure the job is kept for inspection
            job.update({ deadLetter: true, deadLetterReason: error.message });
        }
        async getFailedJobs(queueName) {
            const queuesToCheck = queueName
                ? [this.queues.get(queueName)].filter(Boolean)
                : Array.from(this.queues.values());
            const allFailedJobs = [];
            for (const queue of queuesToCheck) {
                if (!queue)
                    continue;
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
        async retryFailedJob(queueName, jobId) {
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
        async removeFailedJob(queueName, jobId) {
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
        async getQueueStats() {
            const stats = {};
            for (const [queueName, queue] of this.queues) {
                const [waiting, active, completed, failed, delayed, paused] = await Promise.all([
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
        async cleanFailedJobs(olderThanDays = 7) {
            const cutoffTime = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;
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
    };
    return DeadLetterQueueService = _classThis;
})();
export { DeadLetterQueueService };
