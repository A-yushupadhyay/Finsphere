// scripts/makeAdmin.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeAdmin() {
  const email = 'ay9616180577@gmail.com'; // Change this

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'admin' },
    });

    console.log(`✅ ${email} promoted to admin!`);
    console.log(updatedUser);
  } catch (error) {
    console.error(`❌ Failed to promote admin:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();
