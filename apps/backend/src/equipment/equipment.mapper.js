export class EquipmentMapper {
    static toGraphQL(equipment) {
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
    static vendorPricingToGraphQL(vendorPricing) {
        return {
            ...vendorPricing,
            specialPrice: Number(vendorPricing.specialPrice),
        };
    }
    static equipmentListToGraphQL(items) {
        return items.map((item) => EquipmentMapper.toGraphQL(item));
    }
}
