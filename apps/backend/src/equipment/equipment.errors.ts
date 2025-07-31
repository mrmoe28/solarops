import { NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';

export class EquipmentNotFoundError extends NotFoundException {
  constructor(id: string) {
    super(`Equipment with ID ${id} not found`);
  }
}

export class EquipmentCategoryNotFoundError extends NotFoundException {
  constructor(id: string) {
    super(`Equipment category with ID ${id} not found`);
  }
}

export class InvalidPricingError extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

export class DuplicateEquipmentError extends ConflictException {
  constructor(manufacturer: string, modelNumber: string) {
    super(`Equipment ${manufacturer} ${modelNumber} already exists`);
  }
}

export class InvalidSpecificationsError extends BadRequestException {
  constructor(message: string) {
    super(`Invalid specifications format: ${message}`);
  }
}

export class VendorPricingNotFoundError extends NotFoundException {
  constructor(id: string) {
    super(`Vendor pricing with ID ${id} not found`);
  }
}

export class InvalidDateRangeError extends BadRequestException {
  constructor() {
    super('Valid from date must be before valid until date');
  }
}

export class EquipmentInUseError extends BadRequestException {
  constructor(id: string) {
    super(`Equipment with ID ${id} is currently in use and cannot be deleted`);
  }
}