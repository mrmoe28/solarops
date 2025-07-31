import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  MaxLength,
  IsUrl,
  IsBoolean,
} from 'class-validator';

@InputType()
export class CreateEquipmentInput {
  @Field()
  @IsUUID()
  categoryId: string;

  @Field()
  @IsString()
  @MaxLength(200)
  manufacturer: string;

  @Field()
  @IsString()
  @MaxLength(100)
  modelNumber: string;

  @Field()
  @IsString()
  @MaxLength(300)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  specifications?: string; // JSON string, will be validated in service

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  imageUrl?: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0.01)
  standardPrice: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

@InputType()
export class CreateVendorPricingInput {
  @Field()
  @IsString()
  @MaxLength(200)
  vendorName: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0.01)
  specialPrice: number;

  @Field({ nullable: true })
  @IsOptional()
  validFrom?: Date;

  @Field({ nullable: true })
  @IsOptional()
  validUntil?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}

@InputType()
export class CreateEquipmentWithPricingInput extends CreateEquipmentInput {
  @Field(() => [CreateVendorPricingInput], { nullable: true })
  @IsOptional()
  vendorPricing?: CreateVendorPricingInput[];
}
