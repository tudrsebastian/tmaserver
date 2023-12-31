// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;
async function main() {
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);
  const passwordSeba = await bcrypt.hash('password-seba', roundsOfHashing);
  // create two dummy boards
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
      members: { connect: { id: user1.id } as { id: number } },
    },
    create: {
      title: 'Test Board 1',
      members: { connect: { id: user1.id } }, // Connect user1 to board1 during creation.
    },
  });

  const board2 = await prisma.boards.upsert({
    where: { id: 2 },
    update: {
      members: {
        connect: [
          { id: user2.id } as { id: number },
          { id: user1.id } as { id: number },
        ],
      },
    },
    create: {
      title: 'Test Board',
      members: {
        // Connect user2 and user1 to board2 during creation.
        connect: [{ id: user2.id }, { id: user1.id }],
      },
    },
  });
  const board3 = await prisma.boards.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: 'Kanban Board',
    },
  });
  const user3 = await prisma.user.upsert({
    where: { email: 'seba@tdr.com' },
    update: {
      boards: { connect: { id: board3.id } as { id: number } },
      password: passwordSeba,
    },
    create: {
      email: 'seba@tdr.com',
      name: 'Seba Tdr',
      password: passwordSeba,
      boards: { connect: { id: board3.id } }, // Connect user3 to board3 during creation.
    },
  });
  console.log({ board1, board2, board3, user1, user2, user3 });
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
