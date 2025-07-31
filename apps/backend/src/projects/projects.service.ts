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
}
