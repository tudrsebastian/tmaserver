/*
  Warnings:

  - Added the required column `progress` to the `Boards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boards" ADD COLUMN     "progress" TEXT NOT NULL;
