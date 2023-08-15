// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;
async function main() {
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      password: passwordSabin,
    },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: passwordSabin,
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      password: passwordAlex,
    },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: passwordAlex,
    },
  });
  const board1 = await prisma.boards.upsert({
    where: { id: 1 },
    update: {
      createdBy: { connect: { id: user1.id } as { id: number } },
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      progress: 'not started',
      content:
        'Support for MongoDB has been one of the most requested features since the initial release of...',
      published: false,
    },
  });

  const board2 = await prisma.boards.upsert({
    where: { id: 2 },
    update: {
      createdBy: { connect: { id: user2.id } as { id: number } },
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      content:
        'Our engineers have been working hard, issuing new releases with many improvements...',
      progress: 'not started',
      published: true,
    },
  });
  const board3 = await prisma.boards.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      content:
        'Our engineers have been working hard, issuing new releases with many improvements...',
      progress: 'not started',
      published: true,
    },
  });

  console.log({ board1, board2, board3, user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
