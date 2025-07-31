export enum ProjectStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface Project {
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
}

export interface PermitData {
  id: string;
  projectId: string;
  permitOfficeUrl?: string;
  permitFees?: Record<string, any>;
  requirements?: Record<string, any>;
  instructions?: string;
  applicationLinks?: string[];
  scrapedAt: Date;
}

export interface ParcelData {
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
  additionalInfo?: Record<string, any>;
  fetchedAt: Date;
}

export interface SolarDesign {
  id: string;
  projectId: string;
  systemSize: number;
  panelCount: number;
  panelModel?: string;
  inverterModel?: string;
  annualProduction?: number;
  bomList?: BillOfMaterials;
  designUrl?: string;
}

export interface BillOfMaterials {
  panels: MaterialItem[];
  inverters: MaterialItem[];
  mounting: MaterialItem[];
  electrical: MaterialItem[];
  other: MaterialItem[];
}

export interface MaterialItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  partNumber?: string;
  supplier?: string;
}

export interface Proposal {
  id: string;
  projectId: string;
  proposalUrl?: string;
  systemCost?: number;
  savings?: {
    monthly: number;
    annual: number;
    lifetime: number;
  };
  paybackPeriod?: number;
}
