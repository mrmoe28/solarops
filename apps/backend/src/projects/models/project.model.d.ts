export declare enum ProjectStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
export declare class PermitData {
    id: string;
    projectId: string;
    permitOfficeUrl?: string;
    permitFees?: string;
    requirements?: string;
    instructions?: string;
    applicationLinks?: string[];
    scrapedAt: Date;
}
export declare class ParcelData {
    id: string;
    projectId: string;
    parcelNumber?: string;
    ownerName?: string;
    propertyType?: string;
    yearBuilt?: number;
    squareFootage?: number;
    roofType?: string;
    roofAge?: number;
    electricalPanel?: string;
    fetchedAt: Date;
}
export declare class SolarDesign {
    id: string;
    projectId: string;
    systemSize: number;
    panelCount: number;
    panelModel?: string;
    inverterModel?: string;
    annualProduction?: number;
    bomList?: string;
    designUrl?: string;
}
export declare class Proposal {
    id: string;
    projectId: string;
    proposalUrl?: string;
    systemCost?: number;
    savings?: string;
    paybackPeriod?: number;
}
export declare class Project {
    id: string;
    userId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
    permitData?: PermitData;
    parcelData?: ParcelData;
    solarDesign?: SolarDesign;
    proposal?: Proposal;
    projectEquipment?: ProjectEquipment[];
}
export declare class ProjectEquipment {
    id: string;
    projectId: string;
    equipmentId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    vendorUsed?: string;
    notes?: string;
}
//# sourceMappingURL=project.model.d.ts.map