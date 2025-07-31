import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, Length, Matches } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  @Length(2, 2)
  state: string;

  @Field()
  @IsString()
  @Matches(/^\d{5}(-\d{4})?$/)
  zipCode: string;
}

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  state?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/^\d{5}(-\d{4})?$/)
  zipCode?: string;
}
