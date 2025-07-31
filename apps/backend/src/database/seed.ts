import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

  // Create sample equipment
  const solarPanelCategory = categories.find(c => c.name === 'Solar Panels');
  const inverterCategory = categories.find(c => c.name === 'Inverters');

  if (solarPanelCategory && inverterCategory) {
    // Check if equipment already exists
    const existingEquipment = await prisma.equipment.findFirst({
      where: {
        manufacturer: 'REC',
        modelNumber: 'Alpha Pure-R 410',
      },
    });

    if (!existingEquipment) {
      // Solar Panel
      const recPanel = await prisma.equipment.create({
        data: {
          categoryId: solarPanelCategory.id,
          manufacturer: 'REC',
          modelNumber: 'Alpha Pure-R 410',
          name: 'REC Alpha Pure-R 410W Solar Panel',
          description: 'High-efficiency monocrystalline solar panel',
          specifications: {
            power: { watts: 410, efficiency: 21.9 },
            dimensions: { length: 1821, width: 1016, height: 30, unit: 'mm' },
            weight: { value: 19.5, unit: 'kg' },
            warranty: { years: 25, type: 'Product and Performance' },
          },
          standardPrice: 320,
          isActive: true,
        },
      });

      await prisma.vendorPricing.create({
        data: {
          equipmentId: recPanel.id,
          vendorName: 'SolarMax Distributors',
          specialPrice: 285,
          notes: 'Volume pricing for orders over 100 panels',
          isActive: true,
        },
      });

      // Inverter
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

      console.log('✅ Created sample equipment with vendor pricing');
    } else {
      console.log('⏭️  Equipment already exists, skipping...');
    }
  }
}

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed equipment first
  await seedEquipment();

  // Create test user
  const hashedPassword = await bcrypt.hash('testpassword123', 10);

  const testUser = await prisma.user.upsert({
    where: { email: 'test@solarops.com' },
    update: {},
    create: {
      email: 'test@solarops.com',
      password: hashedPassword,
      name: 'Test User',
    },
  });

  console.log('✅ Created test user:', {
    email: testUser.email,
    name: testUser.name,
    id: testUser.id,
  });

  // Create demo user
  const demoHashedPassword = await bcrypt.hash('demo123', 10);

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@solarops.com' },
    update: {},
    create: {
      email: 'demo@solarops.com',
      password: demoHashedPassword,
      name: 'Demo User',
    },
  });

  console.log('✅ Created demo user:', {
    email: demoUser.email,
    name: demoUser.name,
    id: demoUser.id,
  });

  // Create a sample project for the test user
  const sampleProject = await prisma.project.create({
    data: {
      name: 'Sample Solar Installation',
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      status: 'PENDING',
      userId: testUser.id,
    },
  });

  console.log('✅ Created sample project:', {
    name: sampleProject.name,
    address: sampleProject.address,
    id: sampleProject.id,
  });

  console.log('🎉 Database seeding completed!');
  console.log('\n📝 Test Credentials:');
  console.log('   Email: test@solarops.com');
  console.log('   Password: testpassword123');
  console.log('\n📝 Demo Credentials:');
  console.log('   Email: demo@solarops.com');
  console.log('   Password: demo123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
