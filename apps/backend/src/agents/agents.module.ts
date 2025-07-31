import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AgentsService } from './agents.service';
import { AgentsResolver } from './agents.resolver';
import { AgentProcessors } from './agent.processors';
import { ProjectsModule } from '../projects/projects.module';
import { QUEUE_NAMES } from '@solarops/shared';

@Module({
  imports: [
    ProjectsModule,
    BullModule.registerQueue(
      {
        name: QUEUE_NAMES.PERMIT_OFFICE,
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
          removeOnComplete: true,
          removeOnFail: false,
        },
      },
      {
        name: QUEUE_NAMES.PARCEL_INFO,
        defaultJobOptions: {
          attempts: 2,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
          removeOnComplete: true,
          removeOnFail: false,
        },
      },
      {
        name: QUEUE_NAMES.OPEN_SOLAR,
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 3000,
          },
          removeOnComplete: true,
          removeOnFail: false,
        },
      },
      {
        name: QUEUE_NAMES.PROPOSAL,
        defaultJobOptions: {
          attempts: 5,
          backoff: {
            type: 'exponential',
            delay: 3000,
          },
          removeOnComplete: true,
          removeOnFail: false,
        },
      },
    ),
  ],
  providers: [AgentsService, AgentsResolver, ...AgentProcessors],
  exports: [AgentsService],
})
export class AgentsModule {}
