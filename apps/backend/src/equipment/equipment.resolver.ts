import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EquipmentService } from './equipment.service';
import {
  Equipment,
  EquipmentCategory,
  EquipmentConnection,
  VendorPricing,
} from './models/equipment.model';
import {
  CreateEquipmentWithPricingInput,
  CreateVendorPricingInput,
} from './dto/create-equipment.dto';
import {
  UpdateEquipmentInput,
  UpdateVendorPricingInput,
} from './dto/update-equipment.dto';
import { EquipmentFilterInput } from './dto/equipment-filter.dto';

@Resolver(() => Equipment)
@UseGuards(JwtAuthGuard)
export class EquipmentResolver {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Query(() => EquipmentConnection, { name: 'equipment' })
  async getEquipment(
    @Args('filters', { type: () => EquipmentFilterInput, nullable: true })
    filters?: EquipmentFilterInput
  ): Promise<EquipmentConnection> {
    return this.equipmentService.findEquipment(filters || {});
  }

  @Query(() => Equipment, { name: 'equipmentById' })
  async getEquipmentById(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Equipment> {
    return this.equipmentService.findEquipmentById(id);
  }

  @Query(() => [EquipmentCategory], { name: 'equipmentCategories' })
  async getEquipmentCategories(): Promise<EquipmentCategory[]> {
    return this.equipmentService.getCategories();
  }

  @Mutation(() => Equipment, { name: 'createEquipment' })
  async createEquipment(
    @Args('input') input: CreateEquipmentWithPricingInput
  ): Promise<Equipment> {
    return this.equipmentService.createEquipment(input);
  }

  @Mutation(() => Equipment, { name: 'updateEquipment' })
  async updateEquipment(
    @Args('input') input: UpdateEquipmentInput
  ): Promise<Equipment> {
    return this.equipmentService.updateEquipment(input);
  }

  @Mutation(() => Boolean, { name: 'deleteEquipment' })
  async deleteEquipment(
    @Args('id', { type: () => ID }) id: string
  ): Promise<boolean> {
    return this.equipmentService.deleteEquipment(id);
  }

  @Mutation(() => VendorPricing, { name: 'createVendorPricing' })
  async createVendorPricing(
    @Args('equipmentId', { type: () => ID }) equipmentId: string,
    @Args('input') input: CreateVendorPricingInput
  ): Promise<VendorPricing> {
    return this.equipmentService.createVendorPricing(equipmentId, input);
  }

  @Mutation(() => VendorPricing, { name: 'updateVendorPricing' })
  async updateVendorPricing(
    @Args('input') input: UpdateVendorPricingInput
  ): Promise<VendorPricing> {
    return this.equipmentService.updateVendorPricing(input);
  }

  @Mutation(() => Boolean, { name: 'deleteVendorPricing' })
  async deleteVendorPricing(
    @Args('id', { type: () => ID }) id: string
  ): Promise<boolean> {
    return this.equipmentService.deleteVendorPricing(id);
  }

  @Mutation(() => EquipmentCategory, { name: 'createEquipmentCategory' })
  async createEquipmentCategory(
    @Args('name') name: string,
    @Args('description', { nullable: true }) description?: string
  ): Promise<EquipmentCategory> {
    return this.equipmentService.createCategory(name, description);
  }

  @ResolveField(() => Number, { nullable: true })
  async lowestVendorPrice(@Parent() equipment: Equipment): Promise<number | null> {
    if (!equipment.vendorPricing || equipment.vendorPricing.length === 0) {
      return null;
    }

    const activeVendorPrices = equipment.vendorPricing
      .filter((vp) => vp.isActive)
      .filter((vp) => !vp.validUntil || new Date(vp.validUntil) >= new Date())
      .map((vp) => Number(vp.specialPrice));

    if (activeVendorPrices.length === 0) {
      return null;
    }

    return Math.min(...activeVendorPrices);
  }

  @ResolveField(() => String, { nullable: true })
  specifications(@Parent() equipment: Equipment): string | null {
    if (!equipment.specifications) {
      return null;
    }
    return typeof equipment.specifications === 'string'
      ? equipment.specifications
      : JSON.stringify(equipment.specifications);
  }
}