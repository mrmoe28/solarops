import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class EquipmentCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Equipment {
  @Field(() => ID)
  id: string;

  @Field()
  categoryId: string;

  @Field(() => EquipmentCategory)
  category: EquipmentCategory;

  @Field()
  manufacturer: string;

  @Field()
  modelNumber: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  specifications?: string; // JSON string

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => Float)
  standardPrice: number;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [VendorPricing], { nullable: true })
  vendorPricing?: VendorPricing[];

  @Field(() => Float, { nullable: true })
  lowestVendorPrice?: number; // Computed field
}

@ObjectType()
export class VendorPricing {
  @Field(() => ID)
  id: string;

  @Field()
  equipmentId: string;

  @Field()
  vendorName: string;

  @Field(() => Float)
  specialPrice: number;

  @Field({ nullable: true })
  validFrom?: Date;

  @Field({ nullable: true })
  validUntil?: Date;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class ProjectEquipment {
  @Field(() => ID)
  id: string;

  @Field()
  projectId: string;

  @Field()
  equipmentId: string;

  @Field(() => Equipment)
  equipment: Equipment;

  @Field()
  quantity: number;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Float)
  totalPrice: number;

  @Field({ nullable: true })
  vendorUsed?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class EquipmentConnection {
  @Field(() => [Equipment])
  items: Equipment[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  pageSize: number;

  @Field()
  totalPages: number;
}
