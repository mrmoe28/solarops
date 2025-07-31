import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum AgentType {
  PERMIT_OFFICE = 'PERMIT_OFFICE',
  PARCEL_INFO = 'PARCEL_INFO',
  OPEN_SOLAR = 'OPEN_SOLAR',
  PROPOSAL = 'PROPOSAL',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  RETRYING = 'RETRYING',
}

registerEnumType(AgentType, {
  name: 'AgentType',
});

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@ObjectType()
export class AgentTask {
  @Field(() => ID)
  id: string;

  @Field()
  projectId: string;

  @Field(() => AgentType)
  agentType: AgentType;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field(() => String, { nullable: true })
  input?: string; // JSON string

  @Field(() => String, { nullable: true })
  output?: string; // JSON string

  @Field({ nullable: true })
  error?: string;

  @Field()
  attempts: number;

  @Field({ nullable: true })
  startedAt?: Date;

  @Field({ nullable: true })
  completedAt?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
