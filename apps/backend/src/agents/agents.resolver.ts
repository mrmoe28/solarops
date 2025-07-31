import { Resolver, Mutation, Query, Args, ID, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AgentTask } from './models/agent-task.model';
import { pubSub } from './pubsub';

@Resolver()
export class AgentsResolver {
  constructor(private agentsService: AgentsService) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async startProjectAnalysis(@Args('projectId', { type: () => ID }) projectId: string) {
    const result = await this.agentsService.startProjectAnalysis(projectId);
    return result.success;
  }

  @Query(() => [AgentTask])
  @UseGuards(JwtAuthGuard)
  async agentTasks(@Args('projectId', { type: () => ID }) projectId: string) {
    return this.agentsService.getAgentTasks(projectId);
  }

  @Subscription(() => AgentTask, {
    filter: (payload, variables) => {
      return payload.agentTaskUpdated.projectId === variables.projectId;
    },
  })
  agentTaskUpdated(@Args('projectId', { type: () => ID }) _projectId: string) {
    return pubSub.asyncIterator('agentTaskUpdated');
  }

  // Helper method to publish updates
  async publishTaskUpdate(task: any) {
    await pubSub.publish('agentTaskUpdated', { agentTaskUpdated: task });
  }
}
