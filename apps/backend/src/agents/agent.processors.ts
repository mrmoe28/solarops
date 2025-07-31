import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AgentsService } from './agents.service';
import { PrismaService } from '../database/prisma.service';
import { QUEUE_NAMES, TaskStatus } from '@solarops/shared';
import { LoggerService } from '../common/logger/logger.service';
import { RetryHelper, defaultRetryOptions } from '../common/utils/retry.utils';

@Processor(QUEUE_NAMES.PERMIT_OFFICE)
export class PermitOfficeProcessor {
  constructor(
    private agentsService: AgentsService,
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  @Process('process')
  async process(job: Job) {
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
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.logAgentExecution('PermitOfficeAgent', taskId, 'failed', duration, error);

      await this.agentsService.updateTaskStatus(
        taskId,
        TaskStatus.FAILED,
        null,
        error instanceof Error ? error.message : 'Unknown error',
      );
      throw error;
    }
  }
}

@Processor(QUEUE_NAMES.PARCEL_INFO)
export class ParcelInfoProcessor {
  constructor(
    private agentsService: AgentsService,
    private prisma: PrismaService,
  ) {}

  @Process('process')
  async process(job: Job) {
    const { taskId, projectId } = job.data;
    console.log(
      `[ParcelInfoProcessor] Starting processing for task ${taskId}, project ${projectId}`,
    );

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
    } catch (error) {
      await this.agentsService.updateTaskStatus(
        taskId,
        TaskStatus.FAILED,
        null,
        error instanceof Error ? error.message : 'Unknown error',
      );
      throw error;
    }
  }
}

@Processor(QUEUE_NAMES.OPEN_SOLAR)
export class OpenSolarProcessor {
  constructor(
    private agentsService: AgentsService,
    private prisma: PrismaService,
  ) {}

  @Process('process')
  async process(job: Job) {
    const { taskId, projectId } = job.data;
    console.log(
      `[OpenSolarProcessor] Starting processing for task ${taskId}, project ${projectId}`,
    );

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
        ? (solarPanel.specifications as any).power?.watts || 400 
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
    } catch (error) {
      await this.agentsService.updateTaskStatus(
        taskId,
        TaskStatus.FAILED,
        null,
        error instanceof Error ? error.message : 'Unknown error',
      );
      throw error;
    }
  }
}

@Processor(QUEUE_NAMES.PROPOSAL)
export class ProposalProcessor {
  constructor(
    private agentsService: AgentsService,
    private prisma: PrismaService,
  ) {}

  @Process('process')
  async process(job: Job) {
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
        data: { status: 'COMPLETED' as any },
      });

      console.log(`[ProposalProcessor] Completed processing for task ${taskId}`);
      await this.agentsService.updateTaskStatus(taskId, TaskStatus.COMPLETED, result);
    } catch (error) {
      await this.agentsService.updateTaskStatus(
        taskId,
        TaskStatus.FAILED,
        null,
        error instanceof Error ? error.message : 'Unknown error',
      );
      throw error;
    }
  }
}

export const AgentProcessors = [
  PermitOfficeProcessor,
  ParcelInfoProcessor,
  OpenSolarProcessor,
  ProposalProcessor,
];
