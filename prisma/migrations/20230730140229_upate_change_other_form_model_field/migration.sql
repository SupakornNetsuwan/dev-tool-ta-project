/*
  Warnings:

  - The primary key for the `OtherForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `semester` on the `OtherForm` table. All the data in the column will be lost.
  - You are about to drop the column `taAmount` on the `OtherForm` table. All the data in the column will be lost.
  - You are about to drop the `PeopleInOther` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `certificate` to the `OtherForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hireDuration` to the `OtherForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personId` to the `OtherForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task` to the `OtherForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workDay` to the `OtherForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PeopleInOther` DROP FOREIGN KEY `PeopleInOther_subjectId_fkey`;

-- AlterTable
ALTER TABLE `OtherForm` DROP PRIMARY KEY,
    DROP COLUMN `semester`,
    DROP COLUMN `taAmount`,
    ADD COLUMN `certificate` VARCHAR(191) NOT NULL,
    ADD COLUMN `hireDuration` VARCHAR(191) NOT NULL,
    ADD COLUMN `personId` INTEGER NOT NULL,
    ADD COLUMN `task` VARCHAR(191) NOT NULL,
    ADD COLUMN `workDay` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`subjectId`, `personId`);

-- DropTable
DROP TABLE `PeopleInOther`;
