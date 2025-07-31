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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PENDING"] = "PENDING";
    ProjectStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ProjectStatus["COMPLETED"] = "COMPLETED";
    ProjectStatus["FAILED"] = "FAILED";
})(ProjectStatus || (ProjectStatus = {}));
registerEnumType(ProjectStatus, {
    name: 'ProjectStatus',
});
let PermitData = (() => {
    let _classDecorators = [ObjectType()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _projectId_decorators;
    let _projectId_initializers = [];
    let _projectId_extraInitializers = [];
    let _permitOfficeUrl_decorators;
    let _permitOfficeUrl_initializers = [];
    let _permitOfficeUrl_extraInitializers = [];
    let _permitFees_decorators;
    let _permitFees_initializers = [];
    let _permitFees_extraInitializers = [];
    let _requirements_decorators;
    let _requirements_initializers = [];
    let _requirements_extraInitializers = [];
    let _instructions_decorators;
    let _instructions_initializers = [];
    let _instructions_extraInitializers = [];
    let _applicationLinks_decorators;
    let _applicationLinks_initializers = [];
    let _applicationLinks_extraInitializers = [];
    let _scrapedAt_decorators;
    let _scrapedAt_initializers = [];
    let _scrapedAt_extraInitializers = [];
    var PermitData = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [Field(() => ID)];
            _projectId_decorators = [Field()];
            _permitOfficeUrl_decorators = [Field({ nullable: true })];
            _permitFees_decorators = [Field(() => String, { nullable: true })];
            _requirements_decorators = [Field(() => String, { nullable: true })];
            _instructions_decorators = [Field({ nullable: true })];
            _applicationLinks_decorators = [Field(() => [String], { nullable: true })];
            _scrapedAt_decorators = [Field()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _projectId_decorators, { kind: "field", name: "projectId", static: false, private: false, access: { has: obj => "projectId" in obj, get: obj => obj.projectId, set: (obj, value) => { obj.projectId = value; } }, metadata: _metadata }, _projectId_initializers, _projectId_extraInitializers);
            __esDecorate(null, null, _permitOfficeUrl_decorators, { kind: "field", name: "permitOfficeUrl", static: false, private: false, access: { has: obj => "permitOfficeUrl" in obj, get: obj => obj.permitOfficeUrl, set: (obj, value) => { obj.permitOfficeUrl = value; } }, metadata: _metadata }, _permitOfficeUrl_initializers, _permitOfficeUrl_extraInitializers);
            __esDecorate(null, null, _permitFees_decorators, { kind: "field", name: "permitFees", static: false, private: false, access: { has: obj => "permitFees" in obj, get: obj => obj.permitFees, set: (obj, value) => { obj.permitFees = value; } }, metadata: _metadata }, _permitFees_initializers, _permitFees_extraInitializers);
            __esDecorate(null, null, _requirements_decorators, { kind: "field", name: "requirements", static: false, private: false, access: { has: obj => "requirements" in obj, get: obj => obj.requirements, set: (obj, value) => { obj.requirements = value; } }, metadata: _metadata }, _requirements_initializers, _requirements_extraInitializers);
            __esDecorate(null, null, _instructions_decorators, { kind: "field", name: "instructions", static: false, private: false, access: { has: obj => "instructions" in obj, get: obj => obj.instructions, set: (obj, value) => { obj.instructions = value; } }, metadata: _metadata }, _instructions_initializers, _instructions_extraInitializers);
            __esDecorate(null, null, _applicationLinks_decorators, { kind: "field", name: "applicationLinks", static: false, private: false, access: { has: obj => "applicationLinks" in obj, get: obj => obj.applicationLinks, set: (obj, value) => { obj.applicationLinks = value; } }, metadata: _metadata }, _applicationLinks_initializers, _applicationLinks_extraInitializers);
            __esDecorate(null, null, _scrapedAt_decorators, { kind: "field", name: "scrapedAt", static: false, private: false, access: { has: obj => "scrapedAt" in obj, get: obj => obj.scrapedAt, set: (obj, value) => { obj.scrapedAt = value; } }, metadata: _metadata }, _scrapedAt_initializers, _scrapedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PermitData = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        projectId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _projectId_initializers, void 0));
        permitOfficeUrl = (__runInitializers(this, _projectId_extraInitializers), __runInitializers(this, _permitOfficeUrl_initializers, void 0));
        permitFees = (__runInitializers(this, _permitOfficeUrl_extraInitializers), __runInitializers(this, _permitFees_initializers, void 0)); // JSON string
        requirements = (__runInitializers(this, _permitFees_extraInitializers), __runInitializers(this, _requirements_initializers, void 0)); // JSON string
        instructions = (__runInitializers(this, _requirements_extraInitializers), __runInitializers(this, _instructions_initializers, void 0));
        applicationLinks = (__runInitializers(this, _instructions_extraInitializers), __runInitializers(this, _applicationLinks_initializers, void 0));
        scrapedAt = (__runInitializers(this, _applicationLinks_extraInitializers), __runInitializers(this, _scrapedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _scrapedAt_extraInitializers);
        }
    };
    return PermitData = _classThis;
})();
export { PermitData };
let ParcelData = (() => {
    let _classDecorators = [ObjectType()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _projectId_decorators;
    let _projectId_initializers = [];
    let _projectId_extraInitializers = [];
    let _parcelNumber_decorators;
    let _parcelNumber_initializers = [];
    let _parcelNumber_extraInitializers = [];
    let _ownerName_decorators;
    let _ownerName_initializers = [];
    let _ownerName_extraInitializers = [];
    let _propertyType_decorators;
    let _propertyType_initializers = [];
    let _propertyType_extraInitializers = [];
    let _yearBuilt_decorators;
    let _yearBuilt_initializers = [];
    let _yearBuilt_extraInitializers = [];
    let _squareFootage_decorators;
    let _squareFootage_initializers = [];
    let _squareFootage_extraInitializers = [];
    let _roofType_decorators;
    let _roofType_initializers = [];
    let _roofType_extraInitializers = [];
    let _roofAge_decorators;
    let _roofAge_initializers = [];
    let _roofAge_extraInitializers = [];
    let _electricalPanel_decorators;
    let _electricalPanel_initializers = [];
    let _electricalPanel_extraInitializers = [];
    let _fetchedAt_decorators;
    let _fetchedAt_initializers = [];
    let _fetchedAt_extraInitializers = [];
    var ParcelData = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [Field(() => ID)];
            _projectId_decorators = [Field()];
            _parcelNumber_decorators = [Field({ nullable: true })];
            _ownerName_decorators = [Field({ nullable: true })];
            _propertyType_decorators = [Field({ nullable: true })];
            _yearBuilt_decorators = [Field({ nullable: true })];
            _squareFootage_decorators = [Field({ nullable: true })];
            _roofType_decorators = [Field({ nullable: true })];
            _roofAge_decorators = [Field({ nullable: true })];
            _electricalPanel_decorators = [Field({ nullable: true })];
            _fetchedAt_decorators = [Field()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _projectId_decorators, { kind: "field", name: "projectId", static: false, private: false, access: { has: obj => "projectId" in obj, get: obj => obj.projectId, set: (obj, value) => { obj.projectId = value; } }, metadata: _metadata }, _projectId_initializers, _projectId_extraInitializers);
            __esDecorate(null, null, _parcelNumber_decorators, { kind: "field", name: "parcelNumber", static: false, private: false, access: { has: obj => "parcelNumber" in obj, get: obj => obj.parcelNumber, set: (obj, value) => { obj.parcelNumber = value; } }, metadata: _metadata }, _parcelNumber_initializers, _parcelNumber_extraInitializers);
            __esDecorate(null, null, _ownerName_decorators, { kind: "field", name: "ownerName", static: false, private: false, access: { has: obj => "ownerName" in obj, get: obj => obj.ownerName, set: (obj, value) => { obj.ownerName = value; } }, metadata: _metadata }, _ownerName_initializers, _ownerName_extraInitializers);
            __esDecorate(null, null, _propertyType_decorators, { kind: "field", name: "propertyType", static: false, private: false, access: { has: obj => "propertyType" in obj, get: obj => obj.propertyType, set: (obj, value) => { obj.propertyType = value; } }, metadata: _metadata }, _propertyType_initializers, _propertyType_extraInitializers);
            __esDecorate(null, null, _yearBuilt_decorators, { kind: "field", name: "yearBuilt", static: false, private: false, access: { has: obj => "yearBuilt" in obj, get: obj => obj.yearBuilt, set: (obj, value) => { obj.yearBuilt = value; } }, metadata: _metadata }, _yearBuilt_initializers, _yearBuilt_extraInitializers);
            __esDecorate(null, null, _squareFootage_decorators, { kind: "field", name: "squareFootage", static: false, private: false, access: { has: obj => "squareFootage" in obj, get: obj => obj.squareFootage, set: (obj, value) => { obj.squareFootage = value; } }, metadata: _metadata }, _squareFootage_initializers, _squareFootage_extraInitializers);
            __esDecorate(null, null, _roofType_decorators, { kind: "field", name: "roofType", static: false, private: false, access: { has: obj => "roofType" in obj, get: obj => obj.roofType, set: (obj, value) => { obj.roofType = value; } }, metadata: _metadata }, _roofType_initializers, _roofType_extraInitializers);
            __esDecorate(null, null, _roofAge_decorators, { kind: "field", name: "roofAge", static: false, private: false, access: { has: obj => "roofAge" in obj, get: obj => obj.roofAge, set: (obj, value) => { obj.roofAge = value; } }, metadata: _metadata }, _roofAge_initializers, _roofAge_extraInitializers);
            __esDecorate(null, null, _electricalPanel_decorators, { kind: "field", name: "electricalPanel", static: false, private: false, access: { has: obj => "electricalPanel" in obj, get: obj => obj.electricalPanel, set: (obj, value) => { obj.electricalPanel = value; } }, metadata: _metadata }, _electricalPanel_initializers, _electricalPanel_extraInitializers);
            __esDecorate(null, null, _fetchedAt_decorators, { kind: "field", name: "fetchedAt", static: false, private: false, access: { has: obj => "fetchedAt" in obj, get: obj => obj.fetchedAt, set: (obj, value) => { obj.fetchedAt = value; } }, metadata: _metadata }, _fetchedAt_initializers, _fetchedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ParcelData = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        projectId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _projectId_initializers, void 0));
        parcelNumber = (__runInitializers(this, _projectId_extraInitializers), __runInitializers(this, _parcelNumber_initializers, void 0));
        ownerName = (__runInitializers(this, _parcelNumber_extraInitializers), __runInitializers(this, _ownerName_initializers, void 0));
        propertyType = (__runInitializers(this, _ownerName_extraInitializers), __runInitializers(this, _propertyType_initializers, void 0));
        yearBuilt = (__runInitializers(this, _propertyType_extraInitializers), __runInitializers(this, _yearBuilt_initializers, void 0));
        squareFootage = (__runInitializers(this, _yearBuilt_extraInitializers), __runInitializers(this, _squareFootage_initializers, void 0));
        roofType = (__runInitializers(this, _squareFootage_extraInitializers), __runInitializers(this, _roofType_initializers, void 0));
        roofAge = (__runInitializers(this, _roofType_extraInitializers), __runInitializers(this, _roofAge_initializers, void 0));
        electricalPanel = (__runInitializers(this, _roofAge_extraInitializers), __runInitializers(this, _electricalPanel_initializers, void 0));
        fetchedAt = (__runInitializers(this, _electricalPanel_extraInitializers), __runInitializers(this, _fetchedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _fetchedAt_extraInitializers);
        }
    };
    return ParcelData = _classThis;
})();
export { ParcelData };
let SolarDesign = (() => {
    let _classDecorators = [ObjectType()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _projectId_decorators;
    let _projectId_initializers = [];
    let _projectId_extraInitializers = [];
    let _systemSize_decorators;
    let _systemSize_initializers = [];
    let _systemSize_extraInitializers = [];
    let _panelCount_decorators;
    let _panelCount_initializers = [];
    let _panelCount_extraInitializers = [];
    let _panelModel_decorators;
    let _panelModel_initializers = [];
    let _panelModel_extraInitializers = [];
    let _inverterModel_decorators;
    let _inverterModel_initializers = [];
    let _inverterModel_extraInitializers = [];
    let _annualProduction_decorators;
    let _annualProduction_initializers = [];
    let _annualProduction_extraInitializers = [];
    let _bomList_decorators;
    let _bomList_initializers = [];
    let _bomList_extraInitializers = [];
    let _designUrl_decorators;
    let _designUrl_initializers = [];
    let _designUrl_extraInitializers = [];
    var SolarDesign = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [Field(() => ID)];
            _projectId_decorators = [Field()];
            _systemSize_decorators = [Field()];
            _panelCount_decorators = [Field()];
            _panelModel_decorators = [Field({ nullable: true })];
            _inverterModel_decorators = [Field({ nullable: true })];
            _annualProduction_decorators = [Field({ nullable: true })];
            _bomList_decorators = [Field(() => String, { nullable: true })];
            _designUrl_decorators = [Field({ nullable: true })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _projectId_decorators, { kind: "field", name: "projectId", static: false, private: false, access: { has: obj => "projectId" in obj, get: obj => obj.projectId, set: (obj, value) => { obj.projectId = value; } }, metadata: _metadata }, _projectId_initializers, _projectId_extraInitializers);
            __esDecorate(null, null, _systemSize_decorators, { kind: "field", name: "systemSize", static: false, private: false, access: { has: obj => "systemSize" in obj, get: obj => obj.systemSize, set: (obj, value) => { obj.systemSize = value; } }, metadata: _metadata }, _systemSize_initializers, _systemSize_extraInitializers);
            __esDecorate(null, null, _panelCount_decorators, { kind: "field", name: "panelCount", static: false, private: false, access: { has: obj => "panelCount" in obj, get: obj => obj.panelCount, set: (obj, value) => { obj.panelCount = value; } }, metadata: _metadata }, _panelCount_initializers, _panelCount_extraInitializers);
            __esDecorate(null, null, _panelModel_decorators, { kind: "field", name: "panelModel", static: false, private: false, access: { has: obj => "panelModel" in obj, get: obj => obj.panelModel, set: (obj, value) => { obj.panelModel = value; } }, metadata: _metadata }, _panelModel_initializers, _panelModel_extraInitializers);
            __esDecorate(null, null, _inverterModel_decorators, { kind: "field", name: "inverterModel", static: false, private: false, access: { has: obj => "inverterModel" in obj, get: obj => obj.inverterModel, set: (obj, value) => { obj.inverterModel = value; } }, metadata: _metadata }, _inverterModel_initializers, _inverterModel_extraInitializers);
            __esDecorate(null, null, _annualProduction_decorators, { kind: "field", name: "annualProduction", static: false, private: false, access: { has: obj => "annualProduction" in obj, get: obj => obj.annualProduction, set: (obj, value) => { obj.annualProduction = value; } }, metadata: _metadata }, _annualProduction_initializers, _annualProduction_extraInitializers);
            __esDecorate(null, null, _bomList_decorators, { kind: "field", name: "bomList", static: false, private: false, access: { has: obj => "bomList" in obj, get: obj => obj.bomList, set: (obj, value) => { obj.bomList = value; } }, metadata: _metadata }, _bomList_initializers, _bomList_extraInitializers);
            __esDecorate(null, null, _designUrl_decorators, { kind: "field", name: "designUrl", static: false, private: false, access: { has: obj => "designUrl" in obj, get: obj => obj.designUrl, set: (obj, value) => { obj.designUrl = value; } }, metadata: _metadata }, _designUrl_initializers, _designUrl_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SolarDesign = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        projectId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _projectId_initializers, void 0));
        systemSize = (__runInitializers(this, _projectId_extraInitializers), __runInitializers(this, _systemSize_initializers, void 0));
        panelCount = (__runInitializers(this, _systemSize_extraInitializers), __runInitializers(this, _panelCount_initializers, void 0));
        panelModel = (__runInitializers(this, _panelCount_extraInitializers), __runInitializers(this, _panelModel_initializers, void 0));
        inverterModel = (__runInitializers(this, _panelModel_extraInitializers), __runInitializers(this, _inverterModel_initializers, void 0));
        annualProduction = (__runInitializers(this, _inverterModel_extraInitializers), __runInitializers(this, _annualProduction_initializers, void 0));
        bomList = (__runInitializers(this, _annualProduction_extraInitializers), __runInitializers(this, _bomList_initializers, void 0)); // JSON string
        designUrl = (__runInitializers(this, _bomList_extraInitializers), __runInitializers(this, _designUrl_initializers, void 0));
        constructor() {
            __runInitializers(this, _designUrl_extraInitializers);
        }
    };
    return SolarDesign = _classThis;
})();
export { SolarDesign };
let Proposal = (() => {
    let _classDecorators = [ObjectType()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _projectId_decorators;
    let _projectId_initializers = [];
    let _projectId_extraInitializers = [];
    let _proposalUrl_decorators;
    let _proposalUrl_initializers = [];
    let _proposalUrl_extraInitializers = [];
    let _systemCost_decorators;
    let _systemCost_initializers = [];
    let _systemCost_extraInitializers = [];
    let _savings_decorators;
    let _savings_initializers = [];
    let _savings_extraInitializers = [];
    let _paybackPeriod_decorators;
    let _paybackPeriod_initializers = [];
    let _paybackPeriod_extraInitializers = [];
    var Proposal = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [Field(() => ID)];
            _projectId_decorators = [Field()];
            _proposalUrl_decorators = [Field({ nullable: true })];
            _systemCost_decorators = [Field({ nullable: true })];
            _savings_decorators = [Field(() => String, { nullable: true })];
            _paybackPeriod_decorators = [Field({ nullable: true })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _projectId_decorators, { kind: "field", name: "projectId", static: false, private: false, access: { has: obj => "projectId" in obj, get: obj => obj.projectId, set: (obj, value) => { obj.projectId = value; } }, metadata: _metadata }, _projectId_initializers, _projectId_extraInitializers);
            __esDecorate(null, null, _proposalUrl_decorators, { kind: "field", name: "proposalUrl", static: false, private: false, access: { has: obj => "proposalUrl" in obj, get: obj => obj.proposalUrl, set: (obj, value) => { obj.proposalUrl = value; } }, metadata: _metadata }, _proposalUrl_initializers, _proposalUrl_extraInitializers);
            __esDecorate(null, null, _systemCost_decorators, { kind: "field", name: "systemCost", static: false, private: false, access: { has: obj => "systemCost" in obj, get: obj => obj.systemCost, set: (obj, value) => { obj.systemCost = value; } }, metadata: _metadata }, _systemCost_initializers, _systemCost_extraInitializers);
            __esDecorate(null, null, _savings_decorators, { kind: "field", name: "savings", static: false, private: false, access: { has: obj => "savings" in obj, get: obj => obj.savings, set: (obj, value) => { obj.savings = value; } }, metadata: _metadata }, _savings_initializers, _savings_extraInitializers);
            __esDecorate(null, null, _paybackPeriod_decorators, { kind: "field", name: "paybackPeriod", static: false, private: false, access: { has: obj => "paybackPeriod" in obj, get: obj => obj.paybackPeriod, set: (obj, value) => { obj.paybackPeriod = value; } }, metadata: _metadata }, _paybackPeriod_initializers, _paybackPeriod_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Proposal = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        projectId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _projectId_initializers, void 0));
        proposalUrl = (__runInitializers(this, _projectId_extraInitializers), __runInitializers(this, _proposalUrl_initializers, void 0));
        systemCost = (__runInitializers(this, _proposalUrl_extraInitializers), __runInitializers(this, _systemCost_initializers, void 0));
        savings = (__runInitializers(this, _systemCost_extraInitializers), __runInitializers(this, _savings_initializers, void 0)); // JSON string
        paybackPeriod = (__runInitializers(this, _savings_extraInitializers), __runInitializers(this, _paybackPeriod_initializers, void 0));
        constructor() {
            __runInitializers(this, _paybackPeriod_extraInitializers);
        }
    };
    return Proposal = _classThis;
})();
export { Proposal };
let Project = (() => {
    let _classDecorators = [ObjectType()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _address_decorators;
    let _address_initializers = [];
    let _address_extraInitializers = [];
    let _city_decorators;
    let _city_initializers = [];
    let _city_extraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _zipCode_decorators;
    let _zipCode_initializers = [];
    let _zipCode_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _permitData_decorators;
    let _permitData_initializers = [];
    let _permitData_extraInitializers = [];
    let _parcelData_decorators;
    let _parcelData_initializers = [];
    let _parcelData_extraInitializers = [];
    let _solarDesign_decorators;
    let _solarDesign_initializers = [];
    let _solarDesign_extraInitializers = [];
    let _proposal_decorators;
    let _proposal_initializers = [];
    let _proposal_extraInitializers = [];
    let _projectEquipment_decorators;
    let _projectEquipment_initializers = [];
    let _projectEquipment_extraInitializers = [];
    var Project = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [Field(() => ID)];
            _userId_decorators = [Field()];
            _name_decorators = [Field()];
            _address_decorators = [Field()];
            _city_decorators = [Field()];
            _state_decorators = [Field()];
            _zipCode_decorators = [Field()];
            _status_decorators = [Field(() => ProjectStatus)];
            _createdAt_decorators = [Field()];
            _updatedAt_decorators = [Field()];
            _permitData_decorators = [Field(() => PermitData, { nullable: true })];
            _parcelData_decorators = [Field(() => ParcelData, { nullable: true })];
            _solarDesign_decorators = [Field(() => SolarDesign, { nullable: true })];
            _proposal_decorators = [Field(() => Proposal, { nullable: true })];
            _projectEquipment_decorators = [Field(() => [ProjectEquipment], { nullable: true })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: obj => "city" in obj, get: obj => obj.city, set: (obj, value) => { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(null, null, _zipCode_decorators, { kind: "field", name: "zipCode", static: false, private: false, access: { has: obj => "zipCode" in obj, get: obj => obj.zipCode, set: (obj, value) => { obj.zipCode = value; } }, metadata: _metadata }, _zipCode_initializers, _zipCode_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _permitData_decorators, { kind: "field", name: "permitData", static: false, private: false, access: { has: obj => "permitData" in obj, get: obj => obj.permitData, set: (obj, value) => { obj.permitData = value; } }, metadata: _metadata }, _permitData_initializers, _permitData_extraInitializers);
            __esDecorate(null, null, _parcelData_decorators, { kind: "field", name: "parcelData", static: false, private: false, access: { has: obj => "parcelData" in obj, get: obj => obj.parcelData, set: (obj, value) => { obj.parcelData = value; } }, metadata: _metadata }, _parcelData_initializers, _parcelData_extraInitializers);
            __esDecorate(null, null, _solarDesign_decorators, { kind: "field", name: "solarDesign", static: false, private: false, access: { has: obj => "solarDesign" in obj, get: obj => obj.solarDesign, set: (obj, value) => { obj.solarDesign = value; } }, metadata: _metadata }, _solarDesign_initializers, _solarDesign_extraInitializers);
            __esDecorate(null, null, _proposal_decorators, { kind: "field", name: "proposal", static: false, private: false, access: { has: obj => "proposal" in obj, get: obj => obj.proposal, set: (obj, value) => { obj.proposal = value; } }, metadata: _metadata }, _proposal_initializers, _proposal_extraInitializers);
            __esDecorate(null, null, _projectEquipment_decorators, { kind: "field", name: "projectEquipment", static: false, private: false, access: { has: obj => "projectEquipment" in obj, get: obj => obj.projectEquipment, set: (obj, value) => { obj.projectEquipment = value; } }, metadata: _metadata }, _projectEquipment_initializers, _projectEquipment_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Project = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        name = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
        address = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _address_initializers, void 0));
        city = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _city_initializers, void 0));
        state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
        zipCode = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _zipCode_initializers, void 0));
        status = (__runInitializers(this, _zipCode_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        permitData = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _permitData_initializers, void 0));
        parcelData = (__runInitializers(this, _permitData_extraInitializers), __runInitializers(this, _parcelData_initializers, void 0));
        solarDesign = (__runInitializers(this, _parcelData_extraInitializers), __runInitializers(this, _solarDesign_initializers, void 0));
        proposal = (__runInitializers(this, _solarDesign_extraInitializers), __runInitializers(this, _proposal_initializers, void 0));
        projectEquipment = (__runInitializers(this, _proposal_extraInitializers), __runInitializers(this, _projectEquipment_initializers, void 0));
        constructor() {
            __runInitializers(this, _projectEquipment_extraInitializers);
        }
    };
    return Project = _classThis;
})();
export { Project };
let ProjectEquipment = (() => {
    let _classDecorators = [ObjectType()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _projectId_decorators;
    let _projectId_initializers = [];
    let _projectId_extraInitializers = [];
    let _equipmentId_decorators;
    let _equipmentId_initializers = [];
    let _equipmentId_extraInitializers = [];
    let _quantity_decorators;
    let _quantity_initializers = [];
    let _quantity_extraInitializers = [];
    let _unitPrice_decorators;
    let _unitPrice_initializers = [];
    let _unitPrice_extraInitializers = [];
    let _totalPrice_decorators;
    let _totalPrice_initializers = [];
    let _totalPrice_extraInitializers = [];
    let _vendorUsed_decorators;
    let _vendorUsed_initializers = [];
    let _vendorUsed_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    var ProjectEquipment = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [Field(() => ID)];
            _projectId_decorators = [Field()];
            _equipmentId_decorators = [Field()];
            _quantity_decorators = [Field()];
            _unitPrice_decorators = [Field(() => Number)];
            _totalPrice_decorators = [Field(() => Number)];
            _vendorUsed_decorators = [Field({ nullable: true })];
            _notes_decorators = [Field({ nullable: true })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _projectId_decorators, { kind: "field", name: "projectId", static: false, private: false, access: { has: obj => "projectId" in obj, get: obj => obj.projectId, set: (obj, value) => { obj.projectId = value; } }, metadata: _metadata }, _projectId_initializers, _projectId_extraInitializers);
            __esDecorate(null, null, _equipmentId_decorators, { kind: "field", name: "equipmentId", static: false, private: false, access: { has: obj => "equipmentId" in obj, get: obj => obj.equipmentId, set: (obj, value) => { obj.equipmentId = value; } }, metadata: _metadata }, _equipmentId_initializers, _equipmentId_extraInitializers);
            __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: obj => "quantity" in obj, get: obj => obj.quantity, set: (obj, value) => { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
            __esDecorate(null, null, _unitPrice_decorators, { kind: "field", name: "unitPrice", static: false, private: false, access: { has: obj => "unitPrice" in obj, get: obj => obj.unitPrice, set: (obj, value) => { obj.unitPrice = value; } }, metadata: _metadata }, _unitPrice_initializers, _unitPrice_extraInitializers);
            __esDecorate(null, null, _totalPrice_decorators, { kind: "field", name: "totalPrice", static: false, private: false, access: { has: obj => "totalPrice" in obj, get: obj => obj.totalPrice, set: (obj, value) => { obj.totalPrice = value; } }, metadata: _metadata }, _totalPrice_initializers, _totalPrice_extraInitializers);
            __esDecorate(null, null, _vendorUsed_decorators, { kind: "field", name: "vendorUsed", static: false, private: false, access: { has: obj => "vendorUsed" in obj, get: obj => obj.vendorUsed, set: (obj, value) => { obj.vendorUsed = value; } }, metadata: _metadata }, _vendorUsed_initializers, _vendorUsed_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ProjectEquipment = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        projectId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _projectId_initializers, void 0));
        equipmentId = (__runInitializers(this, _projectId_extraInitializers), __runInitializers(this, _equipmentId_initializers, void 0));
        quantity = (__runInitializers(this, _equipmentId_extraInitializers), __runInitializers(this, _quantity_initializers, void 0));
        unitPrice = (__runInitializers(this, _quantity_extraInitializers), __runInitializers(this, _unitPrice_initializers, void 0));
        totalPrice = (__runInitializers(this, _unitPrice_extraInitializers), __runInitializers(this, _totalPrice_initializers, void 0));
        vendorUsed = (__runInitializers(this, _totalPrice_extraInitializers), __runInitializers(this, _vendorUsed_initializers, void 0));
        notes = (__runInitializers(this, _vendorUsed_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
        constructor() {
            __runInitializers(this, _notes_extraInitializers);
        }
    };
    return ProjectEquipment = _classThis;
})();
export { ProjectEquipment };
