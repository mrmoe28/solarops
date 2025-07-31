export declare class PriceRangeInput {
    min: number;
    max: number;
}
export declare class EquipmentFilterInput {
    search?: string;
    categoryId?: string;
    manufacturer?: string;
    priceRange?: PriceRangeInput;
    isActive?: boolean;
    limit?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
//# sourceMappingURL=equipment-filter.dto.d.ts.map