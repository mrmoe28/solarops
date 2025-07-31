export declare class CreateEquipmentInput {
    categoryId: string;
    manufacturer: string;
    modelNumber: string;
    name: string;
    description?: string;
    specifications?: string;
    imageUrl?: string;
    standardPrice: number;
    isActive?: boolean;
}
export declare class CreateVendorPricingInput {
    vendorName: string;
    specialPrice: number;
    validFrom?: Date;
    validUntil?: Date;
    notes?: string;
}
export declare class CreateEquipmentWithPricingInput extends CreateEquipmentInput {
    vendorPricing?: CreateVendorPricingInput[];
}
//# sourceMappingURL=create-equipment.dto.d.ts.map