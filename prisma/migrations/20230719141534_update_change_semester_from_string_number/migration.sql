/*
  Warnings:

  - You are about to alter the column `semester` on the `SystemStatus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `SystemStatus` MODIFY `semester` INTEGER NOT NULL;
