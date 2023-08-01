/*
  Warnings:

  - The primary key for the `OtherForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hireDuration` on the `OtherForm` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `OtherForm` table. All the data in the column will be lost.
  - You are about to drop the column `workDay` on the `OtherForm` table. All the data in the column will be lost.
  - Added the required column `groupNumber` to the `OtherForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taHireDuration` to the `OtherForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taWorkDay` to the `OtherForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OtherForm` DROP PRIMARY KEY,
    DROP COLUMN `hireDuration`,
    DROP COLUMN `personId`,
    DROP COLUMN `workDay`,
    ADD COLUMN `groupNumber` INTEGER NOT NULL,
    ADD COLUMN `taHireDuration` VARCHAR(191) NOT NULL,
    ADD COLUMN `taWorkDay` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`subjectId`, `groupNumber`);
