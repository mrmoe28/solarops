import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function seedEquipment() {
    console.log('🌱 Seeding equipment data...');
    // Create equipment categories
    const categories = await Promise.all([
        prisma.equipmentCategory.upsert({
            where: { name: 'Solar Panels' },
            update: {},
            create: {
                name: 'Solar Panels',
                description: 'Photovoltaic panels for converting sunlight to electricity',
            },
        }),
        prisma.equipmentCategory.upsert({
            where: { name: 'Inverters' },
            update: {},
            create: {
                name: 'Inverters',
                description: 'Convert DC power from panels to AC power for home use',
            },
        }),
        prisma.equipmentCategory.upsert({
            where: { name: 'Batteries' },
            update: {},
            create: {
                name: 'Batteries',
                description: 'Energy storage systems for backup power',
            },
        }),
        prisma.equipmentCategory.upsert({
            where: { name: 'Mounting Systems' },
            update: {},
            create: {
                name: 'Mounting Systems',
                description: 'Rails and hardware for panel installation',
            },
        }),
        prisma.equipmentCategory.upsert({
            where: { name: 'Monitoring' },
            update: {},
            create: {
                name: 'Monitoring',
                description: 'System monitoring and optimization equipment',
            },
        }),
    ]);
    console.log(`✅ Created ${categories.length} equipment categories`);
    // Create sample equipment with vendor pricing
    const solarPanelCategory = categories.find((c) => c.name === 'Solar Panels');
    const inverterCategory = categories.find((c) => c.name === 'Inverters');
    const batteryCategory = categories.find((c) => c.name === 'Batteries');
    if (solarPanelCategory && inverterCategory && batteryCategory) {
        // Solar Panels
        const recPanel = await prisma.equipment.create({
            data: {
                categoryId: solarPanelCategory.id,
                manufacturer: 'REC',
                modelNumber: 'Alpha Pure-R 410',
                name: 'REC Alpha Pure-R 410W Solar Panel',
                description: 'High-efficiency monocrystalline solar panel with excellent low-light performance',
                specifications: {
                    power: { watts: 410, efficiency: 21.9 },
                    dimensions: { length: 1821, width: 1016, height: 30, unit: 'mm' },
                    weight: { value: 19.5, unit: 'kg' },
                    warranty: { years: 25, type: 'Product and Performance' },
                    temperature: {
                        coefficientPower: -0.26,
                        nominalOperating: 44,
                        range: { min: -40, max: 85 },
                    },
                },
                standardPrice: 320,
                isActive: true,
            },
        });
        await prisma.vendorPricing.createMany({
            data: [
                {
                    equipmentId: recPanel.id,
                    vendorName: 'SolarMax Distributors',
                    specialPrice: 285,
                    notes: 'Volume pricing for orders over 100 panels',
                    isActive: true,
                },
                {
                    equipmentId: recPanel.id,
                    vendorName: 'Green Energy Supply',
                    specialPrice: 295,
                    validUntil: new Date('2025-12-31'),
                    notes: 'Special contractor pricing',
                    isActive: true,
                },
            ],
        });
        const qcellsPanel = await prisma.equipment.create({
            data: {
                categoryId: solarPanelCategory.id,
                manufacturer: 'Q CELLS',
                modelNumber: 'Q.PEAK DUO BLK ML-G10+ 400',
                name: 'Q CELLS Q.PEAK DUO BLK ML-G10+ 400W',
                description: 'All-black aesthetic solar panel with Q.ANTUM DUO Z Technology',
                specifications: {
                    power: { watts: 400, efficiency: 20.6 },
                    dimensions: { length: 1879, width: 1045, height: 32, unit: 'mm' },
                    weight: { value: 22.5, unit: 'kg' },
                    warranty: { years: 25, type: 'Product and Performance' },
                },
                standardPrice: 290,
                isActive: true,
            },
        });
        await prisma.vendorPricing.create({
            data: {
                equipmentId: qcellsPanel.id,
                vendorName: 'SolarMax Distributors',
                specialPrice: 265,
                notes: 'Bulk order discount',
                isActive: true,
            },
        });
        // Inverters
        const enphaseInverter = await prisma.equipment.create({
            data: {
                categoryId: inverterCategory.id,
                manufacturer: 'Enphase',
                modelNumber: 'IQ8A-72-2-US',
                name: 'Enphase IQ8A Microinverter',
                description: 'Grid-agnostic microinverter with Ensemble technology',
                specifications: {
                    power: {
                        peakOutput: 366,
                        nominalOutput: 349,
                        efficiency: 97.5,
                    },
                    input: {
                        maxDcVoltage: 60,
                        startVoltage: 29,
                        operatingRange: { min: 27, max: 48 },
                    },
                    dimensions: { length: 212, width: 175, height: 30, unit: 'mm' },
                    weight: { value: 1.08, unit: 'kg' },
                    warranty: { years: 25, type: 'Product' },
                },
                standardPrice: 185,
                isActive: true,
            },
        });
        await prisma.vendorPricing.create({
            data: {
                equipmentId: enphaseInverter.id,
                vendorName: 'Enphase Direct',
                specialPrice: 165,
                notes: 'Certified installer pricing',
                isActive: true,
            },
        });
        await prisma.equipment.create({
            data: {
                categoryId: inverterCategory.id,
                manufacturer: 'SMA',
                modelNumber: 'SB7.7-1SP-US-41',
                name: 'SMA Sunny Boy 7.7kW String Inverter',
                description: 'High-performance string inverter with integrated arc fault circuit interrupter',
                specifications: {
                    power: {
                        ratedOutput: 7700,
                        maxOutput: 7700,
                        efficiency: 97.5,
                    },
                    input: {
                        maxDcPower: 11750,
                        maxDcVoltage: 600,
                        mppRange: { min: 175, max: 480 },
                    },
                    dimensions: { length: 490, width: 519, height: 185, unit: 'mm' },
                    weight: { value: 17.5, unit: 'kg' },
                    warranty: { years: 10, type: 'Standard' },
                },
                standardPrice: 2200,
                isActive: true,
            },
        });
        // Batteries
        const teslaBattery = await prisma.equipment.create({
            data: {
                categoryId: batteryCategory.id,
                manufacturer: 'Tesla',
                modelNumber: 'Powerwall 2',
                name: 'Tesla Powerwall 2',
                description: 'Rechargeable home battery system with integrated inverter',
                specifications: {
                    capacity: {
                        energy: 13.5,
                        usableCapacity: 13.5,
                        unit: 'kWh',
                    },
                    power: {
                        continuous: 5000,
                        peak: 7000,
                        unit: 'W',
                    },
                    dimensions: { length: 1150, width: 755, height: 155, unit: 'mm' },
                    weight: { value: 114, unit: 'kg' },
                    warranty: { years: 10, type: 'Product' },
                    roundTripEfficiency: 90,
                },
                standardPrice: 8500,
                isActive: true,
            },
        });
        await prisma.vendorPricing.create({
            data: {
                equipmentId: teslaBattery.id,
                vendorName: 'Tesla Certified Installer',
                specialPrice: 7900,
                notes: 'Certified installer pricing with volume commitment',
                isActive: true,
            },
        });
        console.log('✅ Created sample equipment with vendor pricing');
    }
}
seedEquipment()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
