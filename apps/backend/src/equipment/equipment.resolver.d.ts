import { EquipmentService } from './equipment.service';
import { Equipment, EquipmentCategory, EquipmentConnection, VendorPricing } from './models/equipment.model';
import { CreateEquipmentWithPricingInput, CreateVendorPricingInput } from './dto/create-equipment.dto';
import { UpdateEquipmentInput, UpdateVendorPricingInput } from './dto/update-equipment.dto';
import { EquipmentFilterInput } from './dto/equipment-filter.dto';
export declare class EquipmentResolver {
    private readonly equipmentService;
    constructor(equipmentService: EquipmentService);
    getEquipment(filters?: EquipmentFilterInput): Promise<EquipmentConnection>;
    getEquipmentById(id: string): Promise<Equipment>;
    getEquipmentCategories(): Promise<EquipmentCategory[]>;
    createEquipment(input: CreateEquipmentWithPricingInput): Promise<Equipment>;
    updateEquipment(input: UpdateEquipmentInput): Promise<Equipment>;
    deleteEquipment(id: string): Promise<boolean>;
    createVendorPricing(equipmentId: string, input: CreateVendorPricingInput): Promise<VendorPricing>;
    updateVendorPricing(input: UpdateVendorPricingInput): Promise<VendorPricing>;
    deleteVendorPricing(id: string): Promise<boolean>;
    createEquipmentCategory(name: string, description?: string): Promise<EquipmentCategory>;
    lowestVendorPrice(equipment: Equipment): Promise<number | null>;
    specifications(equipment: Equipment): string | null;
}
//# sourceMappingURL=equipment.resolver.d.ts.map