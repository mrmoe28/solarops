import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, Equipment, VendorPricing, EquipmentCategory } from '@prisma/client';
import { EquipmentMapper } from './equipment.mapper';
import {
  CreateEquipmentWithPricingInput,
  CreateVendorPricingInput,
} from './dto/create-equipment.dto';
import {
  UpdateEquipmentInput,
  UpdateVendorPricingInput,
} from './dto/update-equipment.dto';
import { EquipmentFilterInput } from './dto/equipment-filter.dto';
import {
  EquipmentNotFoundError,
  EquipmentCategoryNotFoundError,
  InvalidPricingError,
  DuplicateEquipmentError,
  InvalidSpecificationsError,
  VendorPricingNotFoundError,
  InvalidDateRangeError,
  EquipmentInUseError,
} from './equipment.errors';

@Injectable()
export class EquipmentService {
  private readonly logger = new Logger(EquipmentService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createEquipment(data: CreateEquipmentWithPricingInput): Promise<any> {
    try {
      // Validate category exists
      const category = await this.prisma.equipmentCategory.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        throw new EquipmentCategoryNotFoundError(data.categoryId);
      }

      // Validate specifications if provided
      if (data.specifications) {
        this.validateSpecifications(data.specifications);
      }

      // Validate vendor pricing
      if (data.vendorPricing) {
        this.validateVendorPricing(data.vendorPricing, data.standardPrice);
      }

      // Create equipment with vendor pricing in a transaction
      const equipment = await this.prisma.$transaction(async (tx) => {
        // Create equipment
        const newEquipment = await tx.equipment.create({
          data: {
            categoryId: data.categoryId,
            manufacturer: data.manufacturer,
            modelNumber: data.modelNumber,
            name: data.name,
            description: data.description,
            specifications: data.specifications ? JSON.parse(data.specifications) : null,
            imageUrl: data.imageUrl,
            standardPrice: data.standardPrice,
            isActive: data.isActive ?? true,
          },
          include: {
            category: true,
          },
        });

        // Create vendor pricing if provided
        if (data.vendorPricing && data.vendorPricing.length > 0) {
          await tx.vendorPricing.createMany({
            data: data.vendorPricing.map((pricing) => ({
              equipmentId: newEquipment.id,
              vendorName: pricing.vendorName,
              specialPrice: pricing.specialPrice,
              validFrom: pricing.validFrom,
              validUntil: pricing.validUntil,
              notes: pricing.notes,
              isActive: true,
            })),
          });
        }

        return newEquipment;
      });

      this.logger.log(`Equipment created: ${equipment.manufacturer} ${equipment.modelNumber}`);
      return EquipmentMapper.toGraphQL(equipment);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new DuplicateEquipmentError(data.manufacturer, data.modelNumber);
      }
      throw error;
    }
  }

  async updateEquipment(data: UpdateEquipmentInput): Promise<any> {
    // Check if equipment exists
    const existingEquipment = await this.prisma.equipment.findUnique({
      where: { id: data.id },
    });

    if (!existingEquipment) {
      throw new EquipmentNotFoundError(data.id);
    }

    // Validate category if being updated
    if (data.categoryId) {
      const category = await this.prisma.equipmentCategory.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        throw new EquipmentCategoryNotFoundError(data.categoryId);
      }
    }

    // Validate specifications if provided
    if (data.specifications) {
      this.validateSpecifications(data.specifications);
    }

    try {
      const equipment = await this.prisma.equipment.update({
        where: { id: data.id },
        data: {
          categoryId: data.categoryId,
          manufacturer: data.manufacturer,
          modelNumber: data.modelNumber,
          name: data.name,
          description: data.description,
          specifications: data.specifications ? JSON.parse(data.specifications) : undefined,
          imageUrl: data.imageUrl,
          standardPrice: data.standardPrice,
          isActive: data.isActive,
        },
        include: {
          category: true,
          vendorPricing: {
            where: { isActive: true },
          },
        },
      });

      this.logger.log(`Equipment updated: ${equipment.id}`);
      return EquipmentMapper.toGraphQL(equipment);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new DuplicateEquipmentError(
          data.manufacturer || existingEquipment.manufacturer,
          data.modelNumber || existingEquipment.modelNumber
        );
      }
      throw error;
    }
  }

  async deleteEquipment(id: string): Promise<boolean> {
    // Check if equipment is in use
    const projectEquipmentCount = await this.prisma.projectEquipment.count({
      where: { equipmentId: id },
    });

    if (projectEquipmentCount > 0) {
      throw new EquipmentInUseError(id);
    }

    try {
      await this.prisma.equipment.delete({
        where: { id },
      });

      this.logger.log(`Equipment deleted: ${id}`);
      return true;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new EquipmentNotFoundError(id);
      }
      throw error;
    }
  }

  async findEquipment(filters: EquipmentFilterInput): Promise<{
    items: any[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const where: Prisma.EquipmentWhereInput = {
      isActive: filters.isActive,
    };

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.manufacturer) {
      where.manufacturer = {
        contains: filters.manufacturer,
        mode: 'insensitive',
      };
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { manufacturer: { contains: filters.search, mode: 'insensitive' } },
        { modelNumber: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.priceRange) {
      where.standardPrice = {
        gte: filters.priceRange.min,
        lte: filters.priceRange.max,
      };
    }

    const limit = filters.limit || 20;
    const page = filters.page || 1;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.equipment.findMany({
        where,
        take: limit,
        skip,
        orderBy: {
          [filters.sortBy || 'name']: filters.sortOrder || 'asc',
        },
        include: {
          category: true,
          vendorPricing: {
            where: {
              isActive: true,
              OR: [
                { validUntil: null },
                { validUntil: { gte: new Date() } },
              ],
            },
          },
        },
      }),
      this.prisma.equipment.count({ where }),
    ]);

    return {
      items: EquipmentMapper.equipmentListToGraphQL(items),
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findEquipmentById(id: string): Promise<any> {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
      include: {
        category: true,
        vendorPricing: {
          where: { isActive: true },
          orderBy: { specialPrice: 'asc' },
        },
      },
    });

    if (!equipment) {
      throw new EquipmentNotFoundError(id);
    }

    return EquipmentMapper.toGraphQL(equipment);
  }

  async createVendorPricing(
    equipmentId: string,
    data: CreateVendorPricingInput
  ): Promise<any> {
    // Validate equipment exists
    const equipment = await this.prisma.equipment.findUnique({
      where: { id: equipmentId },
    });

    if (!equipment) {
      throw new EquipmentNotFoundError(equipmentId);
    }

    // Validate pricing
    if (data.specialPrice >= Number(equipment.standardPrice)) {
      throw new InvalidPricingError(
        'Vendor price must be lower than standard price'
      );
    }

    // Validate date range
    if (data.validFrom && data.validUntil && data.validFrom >= data.validUntil) {
      throw new InvalidDateRangeError();
    }

    const vendorPricing = await this.prisma.vendorPricing.create({
      data: {
        equipmentId,
        vendorName: data.vendorName,
        specialPrice: data.specialPrice,
        validFrom: data.validFrom,
        validUntil: data.validUntil,
        notes: data.notes,
        isActive: true,
      },
    });

    this.logger.log(`Vendor pricing created for equipment ${equipmentId}`);
    return EquipmentMapper.vendorPricingToGraphQL(vendorPricing);
  }

  async updateVendorPricing(data: UpdateVendorPricingInput): Promise<any> {
    const existingPricing = await this.prisma.vendorPricing.findUnique({
      where: { id: data.id },
      include: { equipment: true },
    });

    if (!existingPricing) {
      throw new VendorPricingNotFoundError(data.id);
    }

    // Validate pricing if being updated
    if (
      data.specialPrice &&
      data.specialPrice >= Number(existingPricing.equipment.standardPrice)
    ) {
      throw new InvalidPricingError(
        'Vendor price must be lower than standard price'
      );
    }

    // Validate date range
    const validFrom = data.validFrom || existingPricing.validFrom;
    const validUntil = data.validUntil || existingPricing.validUntil;
    
    if (validFrom && validUntil && validFrom >= validUntil) {
      throw new InvalidDateRangeError();
    }

    const vendorPricing = await this.prisma.vendorPricing.update({
      where: { id: data.id },
      data: {
        vendorName: data.vendorName,
        specialPrice: data.specialPrice,
        validFrom: data.validFrom,
        validUntil: data.validUntil,
        notes: data.notes,
        isActive: data.isActive,
      },
    });

    this.logger.log(`Vendor pricing updated: ${vendorPricing.id}`);
    return EquipmentMapper.vendorPricingToGraphQL(vendorPricing);
  }

  async deleteVendorPricing(id: string): Promise<boolean> {
    try {
      await this.prisma.vendorPricing.delete({
        where: { id },
      });

      this.logger.log(`Vendor pricing deleted: ${id}`);
      return true;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new VendorPricingNotFoundError(id);
      }
      throw error;
    }
  }

  async getCategories(): Promise<EquipmentCategory[]> {
    return this.prisma.equipmentCategory.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async createCategory(name: string, description?: string): Promise<EquipmentCategory> {
    try {
      const category = await this.prisma.equipmentCategory.create({
        data: { name, description },
      });

      this.logger.log(`Equipment category created: ${name}`);
      return category;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(`Category ${name} already exists`);
      }
      throw error;
    }
  }

  private validateSpecifications(specifications: string): void {
    try {
      const parsed = JSON.parse(specifications);
      
      // Validate it's an object
      if (typeof parsed !== 'object' || parsed === null) {
        throw new InvalidSpecificationsError('Specifications must be a JSON object');
      }
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        throw new InvalidSpecificationsError('Invalid JSON format');
      }
      throw error;
    }
  }

  private validateVendorPricing(
    vendorPricing: CreateVendorPricingInput[],
    standardPrice: number
  ): void {
    for (const pricing of vendorPricing) {
      if (pricing.specialPrice >= standardPrice) {
        throw new InvalidPricingError(
          `Vendor price for ${pricing.vendorName} must be lower than standard price`
        );
      }

      if (pricing.validFrom && pricing.validUntil && pricing.validFrom >= pricing.validUntil) {
        throw new InvalidDateRangeError();
      }
    }
  }
}