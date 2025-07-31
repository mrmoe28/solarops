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
import { Process, Processor } from '@nestjs/bull';
import { QUEUE_NAMES, TaskStatus } from '@solarops/shared';
import { RetryHelper, defaultRetryOptions } from '../common/utils/retry.utils';
let PermitOfficeProcessor = (() => {
    let _classDecorators = [Processor(QUEUE_NAMES.PERMIT_OFFICE)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _process_decorators;
    var PermitOfficeProcessor = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _process_decorators = [Process('process')];
            __esDecorate(this, null, _process_decorators, { kind: "method", name: "process", static: false, private: false, access: { has: obj => "process" in obj, get: obj => obj.process }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PermitOfficeProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        agentsService = __runInitializers(this, _instanceExtraInitializers);
        prisma;
        logger;
        constructor(agentsService, prisma, logger) {
            this.agentsService = agentsService;
            this.prisma = prisma;
            this.logger = logger;
        }
        async process(job) {
            const { taskId, projectId } = job.data;
            const startTime = Date.now();
            this.logger.logAgentExecution('PermitOfficeAgent', taskId, 'started');
            try {
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.IN_PROGRESS);
                // Wrap the main logic in retry helper
                const result = await RetryHelper.withRetry(async () => {
                    // Mock implementation for now
                    // In real implementation, this would call external services
                    const permitData = {
                        permitOfficeUrl: 'https://example.gov/permits',
                        permitFees: JSON.stringify({ residential: 500 }),
                        requirements: JSON.stringify(['Site plan', 'Electrical diagram']),
                    };
                    // Save permit data
                    await this.prisma.permitData.create({
                        data: {
                            projectId,
                            ...permitData,
                        },
                    });
                    return permitData;
                }, defaultRetryOptions.permitOfficeAgent);
                const duration = Date.now() - startTime;
                this.logger.logAgentExecution('PermitOfficeAgent', taskId, 'completed', duration);
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.COMPLETED, result);
            }
            catch (error) {
                const duration = Date.now() - startTime;
                this.logger.logAgentExecution('PermitOfficeAgent', taskId, 'failed', duration, error);
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.FAILED, null, error instanceof Error ? error.message : 'Unknown error');
                throw error;
            }
        }
    };
    return PermitOfficeProcessor = _classThis;
})();
export { PermitOfficeProcessor };
let ParcelInfoProcessor = (() => {
    let _classDecorators = [Processor(QUEUE_NAMES.PARCEL_INFO)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _process_decorators;
    var ParcelInfoProcessor = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _process_decorators = [Process('process')];
            __esDecorate(this, null, _process_decorators, { kind: "method", name: "process", static: false, private: false, access: { has: obj => "process" in obj, get: obj => obj.process }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ParcelInfoProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        agentsService = __runInitializers(this, _instanceExtraInitializers);
        prisma;
        constructor(agentsService, prisma) {
            this.agentsService = agentsService;
            this.prisma = prisma;
        }
        async process(job) {
            const { taskId, projectId } = job.data;
            console.log(`[ParcelInfoProcessor] Starting processing for task ${taskId}, project ${projectId}`);
            try {
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.IN_PROGRESS);
                // Mock implementation
                const result = {
                    parcelNumber: 'MOCK-12345',
                    ownerName: 'Property Owner',
                    propertyType: 'Single Family Home',
                    yearBuilt: 2010,
                    squareFootage: 2500,
                    roofType: 'Asphalt Shingle',
                    roofAge: 5,
                    electricalPanel: '200 Amp',
                };
                await this.prisma.parcelData.create({
                    data: {
                        projectId,
                        ...result,
                    },
                });
                console.log(`[ParcelInfoProcessor] Completed processing for task ${taskId}`);
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.COMPLETED, result);
            }
            catch (error) {
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.FAILED, null, error instanceof Error ? error.message : 'Unknown error');
                throw error;
            }
        }
    };
    return ParcelInfoProcessor = _classThis;
})();
export { ParcelInfoProcessor };
let OpenSolarProcessor = (() => {
    let _classDecorators = [Processor(QUEUE_NAMES.OPEN_SOLAR)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _process_decorators;
    var OpenSolarProcessor = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _process_decorators = [Process('process')];
            __esDecorate(this, null, _process_decorators, { kind: "method", name: "process", static: false, private: false, access: { has: obj => "process" in obj, get: obj => obj.process }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OpenSolarProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        agentsService = __runInitializers(this, _instanceExtraInitializers);
        prisma;
        constructor(agentsService, prisma) {
            this.agentsService = agentsService;
            this.prisma = prisma;
        }
        async process(job) {
            const { taskId, projectId } = job.data;
            console.log(`[OpenSolarProcessor] Starting processing for task ${taskId}, project ${projectId}`);
            try {
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.IN_PROGRESS);
                // Get parcel data for additional input
                const parcelData = await this.prisma.parcelData.findUnique({
                    where: { projectId },
                });
                // Get equipment from database with vendor pricing
                const solarPanel = await this.prisma.equipment.findFirst({
                    where: {
                        category: { name: 'Solar Panels' },
                        isActive: true,
                        manufacturer: 'REC',
                    },
                    include: {
                        category: true,
                        vendorPricing: {
                            where: { isActive: true },
                            orderBy: { specialPrice: 'asc' },
                            take: 1,
                        },
                    },
                });
                const inverter = await this.prisma.equipment.findFirst({
                    where: {
                        category: { name: 'Inverters' },
                        isActive: true,
                        manufacturer: 'Enphase',
                    },
                    include: {
                        category: true,
                        vendorPricing: {
                            where: { isActive: true },
                            orderBy: { specialPrice: 'asc' },
                            take: 1,
                        },
                    },
                });
                // Calculate system size based on roof area (mock calculation)
                const systemSize = parcelData?.squareFootage ? Math.min(parcelData.squareFootage * 0.004, 15) : 8.5; // kW
                const panelWattage = solarPanel?.specifications
                    ? solarPanel.specifications.power?.watts || 400
                    : 400;
                const panelCount = Math.ceil((systemSize * 1000) / panelWattage);
                // Get best prices (vendor or standard)
                const panelPrice = solarPanel?.vendorPricing?.[0]?.specialPrice
                    ? Number(solarPanel.vendorPricing[0].specialPrice)
                    : solarPanel ? Number(solarPanel.standardPrice) : 280;
                const inverterPrice = inverter?.vendorPricing?.[0]?.specialPrice
                    ? Number(inverter.vendorPricing[0].specialPrice)
                    : inverter ? Number(inverter.standardPrice) : 145;
                const result = {
                    systemSize,
                    panelCount,
                    panelModel: solarPanel?.name || 'REC Alpha Pure 400W',
                    inverterModel: inverter?.name || 'Enphase IQ8A',
                    annualProduction: systemSize * 1400,
                    bomList: JSON.stringify({
                        panels: [{
                                name: solarPanel?.name || 'REC Alpha Pure 400W',
                                quantity: panelCount,
                                unitPrice: panelPrice,
                                vendorName: solarPanel?.vendorPricing?.[0]?.vendorName,
                                equipmentId: solarPanel?.id,
                            }],
                        inverters: [{
                                name: inverter?.name || 'Enphase IQ8A',
                                quantity: panelCount,
                                unitPrice: inverterPrice,
                                vendorName: inverter?.vendorPricing?.[0]?.vendorName,
                                equipmentId: inverter?.id,
                            }],
                    }),
                };
                const solarDesign = await this.prisma.solarDesign.create({
                    data: {
                        projectId,
                        ...result,
                    },
                });
                // Create project equipment records if equipment was found
                if (solarPanel || inverter) {
                    const projectEquipmentData = [];
                    if (solarPanel) {
                        projectEquipmentData.push({
                            projectId,
                            equipmentId: solarPanel.id,
                            quantity: panelCount,
                            appliedPrice: panelPrice,
                            vendorName: solarPanel.vendorPricing?.[0]?.vendorName,
                        });
                    }
                    if (inverter) {
                        projectEquipmentData.push({
                            projectId,
                            equipmentId: inverter.id,
                            quantity: panelCount,
                            appliedPrice: inverterPrice,
                            vendorName: inverter.vendorPricing?.[0]?.vendorName,
                        });
                    }
                    await this.prisma.projectEquipment.createMany({
                        data: projectEquipmentData,
                    });
                }
                console.log(`[OpenSolarProcessor] Completed processing for task ${taskId}`);
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.COMPLETED, result);
            }
            catch (error) {
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.FAILED, null, error instanceof Error ? error.message : 'Unknown error');
                throw error;
            }
        }
    };
    return OpenSolarProcessor = _classThis;
})();
export { OpenSolarProcessor };
let ProposalProcessor = (() => {
    let _classDecorators = [Processor(QUEUE_NAMES.PROPOSAL)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _process_decorators;
    var ProposalProcessor = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _process_decorators = [Process('process')];
            __esDecorate(this, null, _process_decorators, { kind: "method", name: "process", static: false, private: false, access: { has: obj => "process" in obj, get: obj => obj.process }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ProposalProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        agentsService = __runInitializers(this, _instanceExtraInitializers);
        prisma;
        constructor(agentsService, prisma) {
            this.agentsService = agentsService;
            this.prisma = prisma;
        }
        async process(job) {
            const { taskId, projectId } = job.data;
            console.log(`[ProposalProcessor] Starting processing for task ${taskId}, project ${projectId}`);
            try {
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.IN_PROGRESS);
                // Get project with all data
                const project = await this.prisma.project.findUnique({
                    where: { id: projectId },
                    include: {
                        solarDesign: true,
                        parcelData: true,
                    },
                });
                if (!project || !project.solarDesign) {
                    throw new Error('Project or solar design not found');
                }
                // Mock proposal calculation
                const systemCost = project.solarDesign.systemSize * 3000; // $3/W
                const annualSavings = project.solarDesign.annualProduction * 0.15; // $0.15/kWh
                const result = {
                    systemCost,
                    savings: JSON.stringify({
                        monthly: Math.round(annualSavings / 12),
                        annual: Math.round(annualSavings),
                        lifetime: Math.round(annualSavings * 25),
                    }),
                    paybackPeriod: systemCost / annualSavings,
                };
                await this.prisma.proposal.create({
                    data: {
                        projectId,
                        ...result,
                    },
                });
                // Update project status to completed
                await this.prisma.project.update({
                    where: { id: projectId },
                    data: { status: 'COMPLETED' },
                });
                console.log(`[ProposalProcessor] Completed processing for task ${taskId}`);
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.COMPLETED, result);
            }
            catch (error) {
                await this.agentsService.updateTaskStatus(taskId, TaskStatus.FAILED, null, error instanceof Error ? error.message : 'Unknown error');
                throw error;
            }
        }
    };
    return ProposalProcessor = _classThis;
})();
export { ProposalProcessor };
export const AgentProcessors = [
    PermitOfficeProcessor,
    ParcelInfoProcessor,
    OpenSolarProcessor,
    ProposalProcessor,
];
