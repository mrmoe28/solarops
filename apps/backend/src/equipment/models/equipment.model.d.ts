export declare class EquipmentCategory {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Equipment {
    id: string;
    categoryId: string;
    category: EquipmentCategory;
    manufacturer: string;
    modelNumber: string;
    name: string;
    description?: string;
    specifications?: string;
    imageUrl?: string;
    standardPrice: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    vendorPricing?: VendorPricing[];
    lowestVendorPrice?: number;
}
export declare class VendorPricing {
    id: string;
    equipmentId: string;
    vendorName: string;
    specialPrice: number;
    validFrom?: Date;
    validUntil?: Date;
    notes?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ProjectEquipment {
    id: string;
    projectId: string;
    equipmentId: string;
    equipment: Equipment;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    vendorUsed?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class EquipmentConnection {
    items: Equipment[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
//# sourceMappingURL=equipment.model.d.ts.map