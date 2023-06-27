/*
  Warnings:

  - You are about to drop the column `mameEng` on the `Course` table. All the data in the column will be lost.
  - Added the required column `nameEng` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `mameEng`,
    ADD COLUMN `nameEng` VARCHAR(191) NOT NULL;
