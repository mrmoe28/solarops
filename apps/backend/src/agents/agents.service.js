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
import { AgentType, TaskStatus, ProjectStatus } from '@solarops/shared';
import { pubSub } from './pubsub';
let AgentsService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AgentsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AgentsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        projectsService;
        permitQueue;
        parcelQueue;
        solarQueue;
        proposalQueue;
        constructor(prisma, projectsService, permitQueue, parcelQueue, solarQueue, proposalQueue) {
            this.prisma = prisma;
            this.projectsService = projectsService;
            this.permitQueue = permitQueue;
            this.parcelQueue = parcelQueue;
            this.solarQueue = solarQueue;
            this.proposalQueue = proposalQueue;
        }
        async startProjectAnalysis(projectId) {
            console.log(`[AgentsService] Starting analysis for project ${projectId}`);
            const project = await this.prisma.project.findUnique({
                where: { id: projectId },
            });
            if (!project) {
                throw new Error('Project not found');
            }
            // Update project status
            await this.projectsService.updateStatus(projectId, ProjectStatus.IN_PROGRESS);
            console.log(`[AgentsService] Updated project status to IN_PROGRESS`);
            // Create agent tasks
            const agents = [
                { type: AgentType.PERMIT_OFFICE, queue: this.permitQueue },
                { type: AgentType.PARCEL_INFO, queue: this.parcelQueue },
                { type: AgentType.OPEN_SOLAR, queue: this.solarQueue },
                { type: AgentType.PROPOSAL, queue: this.proposalQueue },
            ];
            for (const agent of agents) {
                // Create task record
                const task = await this.prisma.agentTask.create({
                    data: {
                        projectId,
                        agentType: agent.type,
                        status: TaskStatus.PENDING,
                        input: {
                            address: project.address,
                            city: project.city,
                            state: project.state,
                            zipCode: project.zipCode,
                        },
                    },
                });
                console.log(`[AgentsService] Created task ${task.id} for agent ${agent.type}`);
                // Add to queue
                await agent.queue.add('process', {
                    taskId: task.id,
                    projectId,
                    input: task.input,
                });
                console.log(`[AgentsService] Added task ${task.id} to queue ${agent.type}`);
            }
            console.log(`[AgentsService] All tasks created and queued for project ${projectId}`);
            return { success: true, projectId };
        }
        async getAgentTasks(projectId) {
            return this.prisma.agentTask.findMany({
                where: { projectId },
                orderBy: { createdAt: 'desc' },
            });
        }
        async updateTaskStatus(taskId, status, output, error) {
            console.log(`[Agent] Updating task ${taskId} to status: ${status}`);
            const updatedTask = await this.prisma.agentTask.update({
                where: { id: taskId },
                data: {
                    status,
                    output,
                    error,
                    completedAt: status === TaskStatus.COMPLETED ? new Date() : undefined,
                },
            });
            // Publish the update for real-time subscriptions
            await pubSub.publish('agentTaskUpdated', { agentTaskUpdated: updatedTask });
            console.log(`[Agent] Published update for task ${taskId}`);
            return updatedTask;
        }
    };
    return AgentsService = _classThis;
})();
export { AgentsService };
