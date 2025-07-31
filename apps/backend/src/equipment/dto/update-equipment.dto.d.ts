export declare class UpdateEquipmentInput {
    id: string;
    categoryId?: string;
    manufacturer?: string;
    modelNumber?: string;
    name?: string;
    description?: string;
    specifications?: string;
    imageUrl?: string;
    standardPrice?: number;
    isActive?: boolean;
}
export declare class UpdateVendorPricingInput {
    id: string;
    vendorName?: string;
    specialPrice?: number;
    validFrom?: Date;
    validUntil?: Date;
    notes?: string;
    isActive?: boolean;
}
//# sourceMappingURL=update-equipment.dto.d.ts.map