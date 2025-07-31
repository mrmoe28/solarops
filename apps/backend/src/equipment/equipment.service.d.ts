import { PrismaService } from '../database/prisma.service';
import { EquipmentCategory } from '@prisma/client';
import { CreateEquipmentWithPricingInput, CreateVendorPricingInput } from './dto/create-equipment.dto';
import { UpdateEquipmentInput, UpdateVendorPricingInput } from './dto/update-equipment.dto';
import { EquipmentFilterInput } from './dto/equipment-filter.dto';
export declare class EquipmentService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createEquipment(data: CreateEquipmentWithPricingInput): Promise<any>;
    updateEquipment(data: UpdateEquipmentInput): Promise<any>;
    deleteEquipment(id: string): Promise<boolean>;
    findEquipment(filters: EquipmentFilterInput): Promise<{
        items: any[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    findEquipmentById(id: string): Promise<any>;
    createVendorPricing(equipmentId: string, data: CreateVendorPricingInput): Promise<any>;
    updateVendorPricing(data: UpdateVendorPricingInput): Promise<any>;
    deleteVendorPricing(id: string): Promise<boolean>;
    getCategories(): Promise<EquipmentCategory[]>;
    createCategory(name: string, description?: string): Promise<EquipmentCategory>;
    private validateSpecifications;
    private validateVendorPricing;
}
//# sourceMappingURL=equipment.service.d.ts.map