import { NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
export class EquipmentNotFoundError extends NotFoundException {
    constructor(id) {
        super(`Equipment with ID ${id} not found`);
    }
}
export class EquipmentCategoryNotFoundError extends NotFoundException {
    constructor(id) {
        super(`Equipment category with ID ${id} not found`);
    }
}
export class InvalidPricingError extends BadRequestException {
    constructor(message) {
        super(message);
    }
}
export class DuplicateEquipmentError extends ConflictException {
    constructor(manufacturer, modelNumber) {
        super(`Equipment ${manufacturer} ${modelNumber} already exists`);
    }
}
export class InvalidSpecificationsError extends BadRequestException {
    constructor(message) {
        super(`Invalid specifications format: ${message}`);
    }
}
export class VendorPricingNotFoundError extends NotFoundException {
    constructor(id) {
        super(`Vendor pricing with ID ${id} not found`);
    }
}
export class InvalidDateRangeError extends BadRequestException {
    constructor() {
        super('Valid from date must be before valid until date');
    }
}
export class EquipmentInUseError extends BadRequestException {
    constructor(id) {
        super(`Equipment with ID ${id} is currently in use and cannot be deleted`);
    }
}
