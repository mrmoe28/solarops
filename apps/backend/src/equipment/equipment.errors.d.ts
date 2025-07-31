import { NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
export declare class EquipmentNotFoundError extends NotFoundException {
    constructor(id: string);
}
export declare class EquipmentCategoryNotFoundError extends NotFoundException {
    constructor(id: string);
}
export declare class InvalidPricingError extends BadRequestException {
    constructor(message: string);
}
export declare class DuplicateEquipmentError extends ConflictException {
    constructor(manufacturer: string, modelNumber: string);
}
export declare class InvalidSpecificationsError extends BadRequestException {
    constructor(message: string);
}
export declare class VendorPricingNotFoundError extends NotFoundException {
    constructor(id: string);
}
export declare class InvalidDateRangeError extends BadRequestException {
    constructor();
}
export declare class EquipmentInUseError extends BadRequestException {
    constructor(id: string);
}
//# sourceMappingURL=equipment.errors.d.ts.map