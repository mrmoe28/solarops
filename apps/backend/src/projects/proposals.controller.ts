import { Controller, Get, Param, Res, UseGuards, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Controller('api/proposals')
@UseGuards(JwtAuthGuard)
export class ProposalsController {
  constructor(private prisma: PrismaService) {}

  @Get('download/:token')
  async downloadProposal(
    @Param('token') token: string,
    @CurrentUser() user: User,
    @Res() res: Response,
  ) {
    // Extract project ID from token
    const projectId = token.split('_')[1];
    
    if (!projectId) {
      throw new HttpException('Invalid download token', HttpStatus.NOT_FOUND);
    }

    // Verify the project belongs to the user
    const project = await this.prisma.project.findFirst({
      where: { 
        id: projectId, 
        userId: user.id 
      },
      include: {
        proposal: true,
        solarDesign: true,
        parcelData: true,
        permitData: true,
      },
    });

    if (!project || !project.proposal) {
      throw new HttpException('Proposal not found', HttpStatus.NOT_FOUND);
    }

    // Generate PDF content (simplified for now)
    const pdfContent = this.generateProposalPDF(project);

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="solar-proposal-${project.name}.pdf"`);
    res.setHeader('Content-Length', Buffer.byteLength(pdfContent));

    // Send the PDF content
    res.send(pdfContent);
  }

  private generateProposalPDF(project: any): string {
    // This is a simplified PDF generation
    // In a real implementation, you'd use a library like PDFKit or Puppeteer
    
    const proposal = project.proposal;
    const design = project.solarDesign;
    const parcel = project.parcelData;
    
    // Create a simple text-based "PDF" for demonstration
    const content = `
SOLAR PROPOSAL

Project: ${project.name}
Address: ${project.address}, ${project.city}, ${project.state} ${project.zipCode}

SYSTEM SPECIFICATIONS
====================
System Size: ${design?.systemSize || 'N/A'} kW
Panel Count: ${design?.panelCount || 'N/A'}
Annual Production: ${design?.annualProduction?.toLocaleString() || 'N/A'} kWh

FINANCIAL SUMMARY
================
System Cost: $${proposal?.systemCost?.toLocaleString() || 'N/A'}
Annual Savings: $${(() => {
  try {
    const savings = JSON.parse(proposal?.savings || '{}');
    return savings.annual?.toLocaleString() || 'N/A';
  } catch {
    return 'N/A';
  }
})()}
Payback Period: ${proposal?.paybackPeriod || 'N/A'} years

PROPERTY DETAILS
===============
Parcel Number: ${parcel?.parcelNumber || 'N/A'}
Property Type: ${parcel?.propertyType || 'N/A'}
Year Built: ${parcel?.yearBuilt || 'N/A'}
Square Footage: ${parcel?.squareFootage?.toLocaleString() || 'N/A'} sq ft
Roof Type: ${parcel?.roofType || 'N/A'}
Roof Age: ${parcel?.roofAge || 'N/A'} years

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    return content;
  }
} 