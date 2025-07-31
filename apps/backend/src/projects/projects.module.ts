import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { ProposalsController } from './proposals.controller';

@Module({
  providers: [ProjectsService, ProjectsResolver],
  controllers: [ProposalsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
