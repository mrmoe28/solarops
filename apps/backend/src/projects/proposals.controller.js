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
import { Controller, Get, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
let ProposalsController = (() => {
    let _classDecorators = [Controller('api/proposals'), UseGuards(JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _downloadProposal_decorators;
    var ProposalsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _downloadProposal_decorators = [Get('download/:token')];
            __esDecorate(this, null, _downloadProposal_decorators, { kind: "method", name: "downloadProposal", static: false, private: false, access: { has: obj => "downloadProposal" in obj, get: obj => obj.downloadProposal }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ProposalsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma = __runInitializers(this, _instanceExtraInitializers);
        constructor(prisma) {
            this.prisma = prisma;
        }
        async downloadProposal(token, user, res) {
            // Extract project ID from token
            const projectId = token.split('_')[1];
            if (!projectId) {
                throw new HttpException('Invalid download token', HttpStatus.NOT_FOUND);
            }
            // Verify the project belongs to the user
            const project = await this.prisma.project.findFirst({
                where: {
                    id: projectId,
                    userId: user.id,
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
        generateProposalPDF(project) {
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
                }
                catch {
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
    };
    return ProposalsController = _classThis;
})();
export { ProposalsController };
