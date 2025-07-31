import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, IsUUID, Min, Max } from 'class-validator';

@InputType()
export class PriceRangeInput {
  @Field(() => Float)
  @IsNumber()
  @Min(0)
  min: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  max: number;
}

@InputType()
export class EquipmentFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @Field(() => PriceRangeInput, { nullable: true })
  @IsOptional()
  priceRange?: PriceRangeInput;

  @Field({ nullable: true })
  @IsOptional()
  isActive?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}