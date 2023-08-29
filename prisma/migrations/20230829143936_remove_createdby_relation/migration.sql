/*
  Warnings:

  - You are about to drop the column `authorId` on the `Boards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Boards" DROP CONSTRAINT "Boards_authorId_fkey";

-- AlterTable
ALTER TABLE "Boards" DROP COLUMN "authorId";
