const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
const encryptPassword = require('../utils/encryptPasswordStrategy');

async function main() {
  await prisma.user.deleteMany();
  await prisma.protest.deleteMany();
  await prisma.emolument.deleteMany();

  const hashedPassword = encryptPassword("senha");

  await prisma.user.create({
    data: {
      name: 'Employee User',
      email: 'employee@example.com',
      password: hashedPassword,
      role: 'EMPLOYEE',
      documentNumber: '12345678900',
      hasSetInitialPassword: true
    }
  });

  console.log('Seed data created successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
