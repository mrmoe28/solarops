import { PrismaService } from '../database/prisma.service';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { ProjectStatus } from '@prisma/client';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, input: CreateProjectInput): Promise<{
        permitData: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            permitOfficeUrl: string | null;
            permitFees: import("@prisma/client/runtime/library").JsonValue | null;
            requirements: import("@prisma/client/runtime/library").JsonValue | null;
            instructions: string | null;
            applicationLinks: import("@prisma/client/runtime/library").JsonValue | null;
            scrapedAt: Date;
        } | null;
        parcelData: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            parcelNumber: string | null;
            ownerName: string | null;
            propertyType: string | null;
            yearBuilt: number | null;
            squareFootage: number | null;
            roofType: string | null;
            roofAge: number | null;
            electricalPanel: string | null;
            fetchedAt: Date;
            additionalInfo: import("@prisma/client/runtime/library").JsonValue | null;
        } | null;
        solarDesign: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            systemSize: number;
            panelCount: number;
            panelModel: string | null;
            inverterModel: string | null;
            annualProduction: number | null;
            bomList: import("@prisma/client/runtime/library").JsonValue | null;
            designUrl: string | null;
        } | null;
        proposal: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            proposalUrl: string | null;
            systemCost: number | null;
            savings: import("@prisma/client/runtime/library").JsonValue | null;
            paybackPeriod: number | null;
        } | null;
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        state: string;
        address: string;
        city: string;
        zipCode: string;
        status: import("@prisma/client").$Enums.ProjectStatus;
    }>;
    findAll(userId: string): Promise<({
        permitData: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            permitOfficeUrl: string | null;
            permitFees: import("@prisma/client/runtime/library").JsonValue | null;
            requirements: import("@prisma/client/runtime/library").JsonValue | null;
            instructions: string | null;
            applicationLinks: import("@prisma/client/runtime/library").JsonValue | null;
            scrapedAt: Date;
        } | null;
        parcelData: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            parcelNumber: string | null;
            ownerName: string | null;
            propertyType: string | null;
            yearBuilt: number | null;
            squareFootage: number | null;
            roofType: string | null;
            roofAge: number | null;
            electricalPanel: string | null;
            fetchedAt: Date;
            additionalInfo: import("@prisma/client/runtime/library").JsonValue | null;
        } | null;
        solarDesign: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            systemSize: number;
            panelCount: number;
            panelModel: string | null;
            inverterModel: string | null;
            annualProduction: number | null;
            bomList: import("@prisma/client/runtime/library").JsonValue | null;
            designUrl: string | null;
        } | null;
        proposal: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            proposalUrl: string | null;
            systemCost: number | null;
            savings: import("@prisma/client/runtime/library").JsonValue | null;
            paybackPeriod: number | null;
        } | null;
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        state: string;
        address: string;
        city: string;
        zipCode: string;
        status: import("@prisma/client").$Enums.ProjectStatus;
    })[]>;
    findOne(id: string, userId: string): Promise<({
        permitData: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            permitOfficeUrl: string | null;
            permitFees: import("@prisma/client/runtime/library").JsonValue | null;
            requirements: import("@prisma/client/runtime/library").JsonValue | null;
            instructions: string | null;
            applicationLinks: import("@prisma/client/runtime/library").JsonValue | null;
            scrapedAt: Date;
        } | null;
        parcelData: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            parcelNumber: string | null;
            ownerName: string | null;
            propertyType: string | null;
            yearBuilt: number | null;
            squareFootage: number | null;
            roofType: string | null;
            roofAge: number | null;
            electricalPanel: string | null;
            fetchedAt: Date;
            additionalInfo: import("@prisma/client/runtime/library").JsonValue | null;
        } | null;
        solarDesign: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            systemSize: number;
            panelCount: number;
            panelModel: string | null;
            inverterModel: string | null;
            annualProduction: number | null;
            bomList: import("@prisma/client/runtime/library").JsonValue | null;
            designUrl: string | null;
        } | null;
        proposal: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            proposalUrl: string | null;
            systemCost: number | null;
            savings: import("@prisma/client/runtime/library").JsonValue | null;
            paybackPeriod: number | null;
        } | null;
        agentTasks: {
            error: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.TaskStatus;
            projectId: string;
            agentType: import("@prisma/client").$Enums.AgentType;
            input: import("@prisma/client/runtime/library").JsonValue | null;
            output: import("@prisma/client/runtime/library").JsonValue | null;
            attempts: number;
            startedAt: Date | null;
            completedAt: Date | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        state: string;
        address: string;
        city: string;
        zipCode: string;
        status: import("@prisma/client").$Enums.ProjectStatus;
    }) | null>;
    update(id: string, userId: string, input: UpdateProjectInput): Promise<{
        permitData: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            permitOfficeUrl: string | null;
            permitFees: import("@prisma/client/runtime/library").JsonValue | null;
            requirements: import("@prisma/client/runtime/library").JsonValue | null;
            instructions: string | null;
            applicationLinks: import("@prisma/client/runtime/library").JsonValue | null;
            scrapedAt: Date;
        } | null;
        parcelData: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            parcelNumber: string | null;
            ownerName: string | null;
            propertyType: string | null;
            yearBuilt: number | null;
            squareFootage: number | null;
            roofType: string | null;
            roofAge: number | null;
            electricalPanel: string | null;
            fetchedAt: Date;
            additionalInfo: import("@prisma/client/runtime/library").JsonValue | null;
        } | null;
        solarDesign: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            systemSize: number;
            panelCount: number;
            panelModel: string | null;
            inverterModel: string | null;
            annualProduction: number | null;
            bomList: import("@prisma/client/runtime/library").JsonValue | null;
            designUrl: string | null;
        } | null;
        proposal: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            proposalUrl: string | null;
            systemCost: number | null;
            savings: import("@prisma/client/runtime/library").JsonValue | null;
            paybackPeriod: number | null;
        } | null;
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        state: string;
        address: string;
        city: string;
        zipCode: string;
        status: import("@prisma/client").$Enums.ProjectStatus;
    }>;
    updateStatus(id: string, status: ProjectStatus): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        state: string;
        address: string;
        city: string;
        zipCode: string;
        status: import("@prisma/client").$Enums.ProjectStatus;
    }>;
    delete(id: string, userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    generateProposalDownload(id: string, userId: string): Promise<string>;
}
//# sourceMappingURL=projects.service.d.ts.map