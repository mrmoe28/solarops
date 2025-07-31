import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum ProjectStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

registerEnumType(ProjectStatus, {
  name: 'ProjectStatus',
});

@ObjectType()
export class PermitData {
  @Field(() => ID)
  id: string;

  @Field()
  projectId: string;

  @Field({ nullable: true })
  permitOfficeUrl?: string;

  @Field(() => String, { nullable: true })
  permitFees?: string; // JSON string

  @Field(() => String, { nullable: true })
  requirements?: string; // JSON string

  @Field({ nullable: true })
  instructions?: string;

  @Field(() => [String], { nullable: true })
  applicationLinks?: string[];

  @Field()
  scrapedAt: Date;
}

@ObjectType()
export class ParcelData {
  @Field(() => ID)
  id: string;

  @Field()
  projectId: string;

  @Field({ nullable: true })
  parcelNumber?: string;

  @Field({ nullable: true })
  ownerName?: string;

  @Field({ nullable: true })
  propertyType?: string;

  @Field({ nullable: true })
  yearBuilt?: number;

  @Field({ nullable: true })
  squareFootage?: number;

  @Field({ nullable: true })
  roofType?: string;

  @Field({ nullable: true })
  roofAge?: number;

  @Field({ nullable: true })
  electricalPanel?: string;

  @Field()
  fetchedAt: Date;
}

@ObjectType()
export class SolarDesign {
  @Field(() => ID)
  id: string;

  @Field()
  projectId: string;

  @Field()
  systemSize: number;

  @Field()
  panelCount: number;

  @Field({ nullable: true })
  panelModel?: string;

  @Field({ nullable: true })
  inverterModel?: string;

  @Field({ nullable: true })
  annualProduction?: number;

  @Field(() => String, { nullable: true })
  bomList?: string; // JSON string

  @Field({ nullable: true })
  designUrl?: string;
}

@ObjectType()
export class Proposal {
  @Field(() => ID)
  id: string;

  @Field()
  projectId: string;

  @Field({ nullable: true })
  proposalUrl?: string;

  @Field({ nullable: true })
  systemCost?: number;

  @Field(() => String, { nullable: true })
  savings?: string; // JSON string

  @Field({ nullable: true })
  paybackPeriod?: number;
}

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipCode: string;

  @Field(() => ProjectStatus)
  status: ProjectStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => PermitData, { nullable: true })
  permitData?: PermitData;

  @Field(() => ParcelData, { nullable: true })
  parcelData?: ParcelData;

  @Field(() => SolarDesign, { nullable: true })
  solarDesign?: SolarDesign;

  @Field(() => Proposal, { nullable: true })
  proposal?: Proposal;

  @Field(() => [ProjectEquipment], { nullable: true })
  projectEquipment?: ProjectEquipment[];
}

@ObjectType()
export class ProjectEquipment {
  @Field(() => ID)
  id: string;

  @Field()
  projectId: string;

  @Field()
  equipmentId: string;

  @Field()
  quantity: number;

  @Field(() => Number)
  unitPrice: number;

  @Field(() => Number)
  totalPrice: number;

  @Field({ nullable: true })
  vendorUsed?: string;

  @Field({ nullable: true })
  notes?: string;
}
