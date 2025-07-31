import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './models/project.model';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '@prisma/client';

@Resolver(() => Project)
@UseGuards(JwtAuthGuard)
export class ProjectsResolver {
  constructor(private projectsService: ProjectsService) {}

  @Query(() => [Project])
  async projects(@CurrentUser() user: User) {
    return this.projectsService.findAll(user.id);
  }

  @Query(() => Project, { nullable: true })
  async project(@Args('id', { type: () => ID }) id: string, @CurrentUser() user: User) {
    return this.projectsService.findOne(id, user.id);
  }

  @Mutation(() => Project)
  async createProject(@Args('input') input: CreateProjectInput, @CurrentUser() user: User) {
    return this.projectsService.create(user.id, input);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProjectInput,
    @CurrentUser() user: User,
  ) {
    return this.projectsService.update(id, user.id, input);
  }

  @Mutation(() => Boolean)
  async deleteProject(@Args('id', { type: () => ID }) id: string, @CurrentUser() user: User) {
    const result = await this.projectsService.delete(id, user.id);
    return result.count > 0;
  }

  @Mutation(() => String)
  async generateProposalDownload(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.projectsService.generateProposalDownload(id, user.id);
  }
}
