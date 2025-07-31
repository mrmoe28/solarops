interface EquipmentItem {
    id: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    vendorUsed?: string;
    notes?: string;
    equipment: {
        id: string;
        manufacturer: string;
        modelNumber: string;
        name: string;
        description?: string;
        specifications?: string;
        imageUrl?: string;
        standardPrice: number;
        category: {
            id: string;
            name: string;
        };
    };
}
interface SolarDesignData {
    systemSize: number;
    panelCount: number;
    panelModel?: string;
    inverterModel?: string;
    annualProduction?: number;
    bomList?: string;
}
interface EquipmentDetailsCardProps {
    solarDesign: SolarDesignData;
    projectEquipment?: EquipmentItem[];
}
export declare function EquipmentDetailsCard({ solarDesign, projectEquipment }: EquipmentDetailsCardProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=equipment-details-card.d.ts.map