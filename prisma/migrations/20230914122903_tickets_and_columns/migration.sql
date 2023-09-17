/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Boards` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Boards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Boards" DROP COLUMN "createdAt",
DROP COLUMN "progress",
DROP COLUMN "published",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Column" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" SERIAL,
    "boardID" INTEGER NOT NULL,
    "columnID" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Column_id_key" ON "Column"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_id_key" ON "Ticket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Boards_id_key" ON "Boards"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_boardID_fkey" FOREIGN KEY ("boardID") REFERENCES "Boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_columnID_fkey" FOREIGN KEY ("columnID") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
