import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from '../database/prisma.service';
import { ProjectsService } from '../projects/projects.service';
import { AgentType, TaskStatus, ProjectStatus, QUEUE_NAMES } from '@solarops/shared';
import { pubSub } from './pubsub';

@Injectable()
export class AgentsService {
  constructor(
    private prisma: PrismaService,
    private projectsService: ProjectsService,
    @InjectQueue(QUEUE_NAMES.PERMIT_OFFICE) private permitQueue: Queue,
    @InjectQueue(QUEUE_NAMES.PARCEL_INFO) private parcelQueue: Queue,
    @InjectQueue(QUEUE_NAMES.OPEN_SOLAR) private solarQueue: Queue,
    @InjectQueue(QUEUE_NAMES.PROPOSAL) private proposalQueue: Queue,
  ) {}

  async startProjectAnalysis(projectId: string) {
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

  async getAgentTasks(projectId: string) {
    return this.prisma.agentTask.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateTaskStatus(taskId: string, status: TaskStatus, output?: any, error?: string) {
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
}
