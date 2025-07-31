import { Equipment as PrismaEquipment, VendorPricing as PrismaVendorPricing } from '@prisma/client';
export declare class EquipmentMapper {
    static toGraphQL(equipment: PrismaEquipment & {
        category?: any;
        vendorPricing?: PrismaVendorPricing[];
    }): any;
    static vendorPricingToGraphQL(vendorPricing: PrismaVendorPricing): any;
    static equipmentListToGraphQL(items: any[]): any[];
}
//# sourceMappingURL=equipment.mapper.d.ts.map