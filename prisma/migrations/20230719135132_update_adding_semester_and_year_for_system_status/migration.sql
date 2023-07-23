/*
  Warnings:

  - Added the required column `semester` to the `SystemStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `SystemStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SystemStatus` ADD COLUMN `semester` VARCHAR(191) NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;
