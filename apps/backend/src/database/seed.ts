import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

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
