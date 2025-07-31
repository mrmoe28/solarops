import { Equipment as PrismaEquipment, VendorPricing as PrismaVendorPricing } from '@prisma/client';

export class EquipmentMapper {
  static toGraphQL(
    equipment: PrismaEquipment & {
      category?: any;
      vendorPricing?: PrismaVendorPricing[];
    },
  ): any {
    return {
      ...equipment,
      standardPrice: Number(equipment.standardPrice),
      specifications: equipment.specifications ? JSON.stringify(equipment.specifications) : null,
      vendorPricing: equipment.vendorPricing?.map((vp) => ({
        ...vp,
        specialPrice: Number(vp.specialPrice),
      })),
    };
  }

  static vendorPricingToGraphQL(vendorPricing: PrismaVendorPricing): any {
    return {
      ...vendorPricing,
      specialPrice: Number(vendorPricing.specialPrice),
    };
  }

  static equipmentListToGraphQL(items: any[]): any[] {
    return items.map((item) => EquipmentMapper.toGraphQL(item));
  }
}
