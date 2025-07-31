import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { ProjectStatus } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, input: CreateProjectInput) {
    return this.prisma.project.create({
      data: {
        ...input,
        userId,
      },
      include: {
        permitData: true,
        parcelData: true,
        solarDesign: true,
        proposal: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      include: {
        permitData: true,
        parcelData: true,
        solarDesign: true,
        proposal: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.project.findFirst({
      where: { id, userId },
      include: {
        permitData: true,
        parcelData: true,
        solarDesign: true,
        proposal: true,
        agentTasks: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async update(id: string, userId: string, input: UpdateProjectInput) {
    return this.prisma.project.update({
      where: { id },
      data: input,
      include: {
        permitData: true,
        parcelData: true,
        solarDesign: true,
        proposal: true,
      },
    });
  }

  async updateStatus(id: string, status: ProjectStatus) {
    return this.prisma.project.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.project.deleteMany({
      where: { id, userId },
    });
  }

  async generateProposalDownload(id: string, userId: string): Promise<string> {
    const project = await this.findOne(id, userId);
    if (!project || !project.proposal) {
      throw new Error('Project or proposal not found');
    }

    // Generate a unique download token
    const downloadToken = `proposal_${id}_${Date.now()}`;

    // Store the download token in the proposal
    await this.prisma.proposal.update({
      where: { projectId: id },
      data: {
        proposalUrl: `/api/proposals/download/${downloadToken}`,
      },
    });

    return downloadToken;
  }
}
