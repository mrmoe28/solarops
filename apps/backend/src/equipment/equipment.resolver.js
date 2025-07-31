var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { Resolver, Query, Mutation, ResolveField } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Equipment, EquipmentCategory, EquipmentConnection, VendorPricing, } from './models/equipment.model';
let EquipmentResolver = (() => {
    let _classDecorators = [Resolver(() => Equipment), UseGuards(JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getEquipment_decorators;
    let _getEquipmentById_decorators;
    let _getEquipmentCategories_decorators;
    let _createEquipment_decorators;
    let _updateEquipment_decorators;
    let _deleteEquipment_decorators;
    let _createVendorPricing_decorators;
    let _updateVendorPricing_decorators;
    let _deleteVendorPricing_decorators;
    let _createEquipmentCategory_decorators;
    let _lowestVendorPrice_decorators;
    let _specifications_decorators;
    var EquipmentResolver = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getEquipment_decorators = [Query(() => EquipmentConnection, { name: 'equipment' })];
            _getEquipmentById_decorators = [Query(() => Equipment, { name: 'equipmentById' })];
            _getEquipmentCategories_decorators = [Query(() => [EquipmentCategory], { name: 'equipmentCategories' })];
            _createEquipment_decorators = [Mutation(() => Equipment, { name: 'createEquipment' })];
            _updateEquipment_decorators = [Mutation(() => Equipment, { name: 'updateEquipment' })];
            _deleteEquipment_decorators = [Mutation(() => Boolean, { name: 'deleteEquipment' })];
            _createVendorPricing_decorators = [Mutation(() => VendorPricing, { name: 'createVendorPricing' })];
            _updateVendorPricing_decorators = [Mutation(() => VendorPricing, { name: 'updateVendorPricing' })];
            _deleteVendorPricing_decorators = [Mutation(() => Boolean, { name: 'deleteVendorPricing' })];
            _createEquipmentCategory_decorators = [Mutation(() => EquipmentCategory, { name: 'createEquipmentCategory' })];
            _lowestVendorPrice_decorators = [ResolveField(() => Number, { nullable: true })];
            _specifications_decorators = [ResolveField(() => String, { nullable: true })];
            __esDecorate(this, null, _getEquipment_decorators, { kind: "method", name: "getEquipment", static: false, private: false, access: { has: obj => "getEquipment" in obj, get: obj => obj.getEquipment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEquipmentById_decorators, { kind: "method", name: "getEquipmentById", static: false, private: false, access: { has: obj => "getEquipmentById" in obj, get: obj => obj.getEquipmentById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEquipmentCategories_decorators, { kind: "method", name: "getEquipmentCategories", static: false, private: false, access: { has: obj => "getEquipmentCategories" in obj, get: obj => obj.getEquipmentCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createEquipment_decorators, { kind: "method", name: "createEquipment", static: false, private: false, access: { has: obj => "createEquipment" in obj, get: obj => obj.createEquipment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateEquipment_decorators, { kind: "method", name: "updateEquipment", static: false, private: false, access: { has: obj => "updateEquipment" in obj, get: obj => obj.updateEquipment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteEquipment_decorators, { kind: "method", name: "deleteEquipment", static: false, private: false, access: { has: obj => "deleteEquipment" in obj, get: obj => obj.deleteEquipment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createVendorPricing_decorators, { kind: "method", name: "createVendorPricing", static: false, private: false, access: { has: obj => "createVendorPricing" in obj, get: obj => obj.createVendorPricing }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateVendorPricing_decorators, { kind: "method", name: "updateVendorPricing", static: false, private: false, access: { has: obj => "updateVendorPricing" in obj, get: obj => obj.updateVendorPricing }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteVendorPricing_decorators, { kind: "method", name: "deleteVendorPricing", static: false, private: false, access: { has: obj => "deleteVendorPricing" in obj, get: obj => obj.deleteVendorPricing }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createEquipmentCategory_decorators, { kind: "method", name: "createEquipmentCategory", static: false, private: false, access: { has: obj => "createEquipmentCategory" in obj, get: obj => obj.createEquipmentCategory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _lowestVendorPrice_decorators, { kind: "method", name: "lowestVendorPrice", static: false, private: false, access: { has: obj => "lowestVendorPrice" in obj, get: obj => obj.lowestVendorPrice }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _specifications_decorators, { kind: "method", name: "specifications", static: false, private: false, access: { has: obj => "specifications" in obj, get: obj => obj.specifications }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EquipmentResolver = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        equipmentService = __runInitializers(this, _instanceExtraInitializers);
        constructor(equipmentService) {
            this.equipmentService = equipmentService;
        }
        async getEquipment(filters) {
            return this.equipmentService.findEquipment(filters || {});
        }
        async getEquipmentById(id) {
            return this.equipmentService.findEquipmentById(id);
        }
        async getEquipmentCategories() {
            return this.equipmentService.getCategories();
        }
        async createEquipment(input) {
            return this.equipmentService.createEquipment(input);
        }
        async updateEquipment(input) {
            return this.equipmentService.updateEquipment(input);
        }
        async deleteEquipment(id) {
            return this.equipmentService.deleteEquipment(id);
        }
        async createVendorPricing(equipmentId, input) {
            return this.equipmentService.createVendorPricing(equipmentId, input);
        }
        async updateVendorPricing(input) {
            return this.equipmentService.updateVendorPricing(input);
        }
        async deleteVendorPricing(id) {
            return this.equipmentService.deleteVendorPricing(id);
        }
        async createEquipmentCategory(name, description) {
            return this.equipmentService.createCategory(name, description);
        }
        async lowestVendorPrice(equipment) {
            if (!equipment.vendorPricing || equipment.vendorPricing.length === 0) {
                return null;
            }
            const activeVendorPrices = equipment.vendorPricing
                .filter((vp) => vp.isActive)
                .filter((vp) => !vp.validUntil || new Date(vp.validUntil) >= new Date())
                .map((vp) => Number(vp.specialPrice));
            if (activeVendorPrices.length === 0) {
                return null;
            }
            return Math.min(...activeVendorPrices);
        }
        specifications(equipment) {
            if (!equipment.specifications) {
                return null;
            }
            return typeof equipment.specifications === 'string'
                ? equipment.specifications
                : JSON.stringify(equipment.specifications);
        }
    };
    return EquipmentResolver = _classThis;
})();
export { EquipmentResolver };
