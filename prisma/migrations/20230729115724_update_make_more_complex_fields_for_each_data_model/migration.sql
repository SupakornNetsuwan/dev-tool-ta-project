/*
  Warnings:

  - The primary key for the `GTEForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GTEForm` table. All the data in the column will be lost.
  - The primary key for the `LTForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `LTForm` table. All the data in the column will be lost.
  - The primary key for the `OtherForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OtherForm` table. All the data in the column will be lost.
  - The primary key for the `ProjectBaseForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProjectBaseForm` table. All the data in the column will be lost.
  - The primary key for the `RefScheduleForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RefScheduleForm` table. All the data in the column will be lost.
  - The primary key for the `ResearchHelperForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ResearchHelperForm` table. All the data in the column will be lost.
  - The primary key for the `TheoryForm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TheoryForm` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `GTEForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupNumber` to the `LTForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `LTForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `OtherForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `OtherForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taAmount` to the `OtherForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupNumber` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupNumber` to the `RefScheduleForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `RefScheduleForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budgetYear` to the `ResearchHelperForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fund` to the `ResearchHelperForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `ResearchHelperForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taAmount` to the `ResearchHelperForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupNumber` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `GTEForm` DROP FOREIGN KEY `GTEForm_id_fkey`;

-- DropForeignKey
ALTER TABLE `LTForm` DROP FOREIGN KEY `LTForm_id_fkey`;

-- DropForeignKey
ALTER TABLE `OtherForm` DROP FOREIGN KEY `OtherForm_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectBaseForm` DROP FOREIGN KEY `ProjectBaseForm_id_fkey`;

-- DropForeignKey
ALTER TABLE `RefScheduleForm` DROP FOREIGN KEY `RefScheduleForm_id_fkey`;

-- DropForeignKey
ALTER TABLE `ResearchHelperForm` DROP FOREIGN KEY `ResearchHelperForm_id_fkey`;

-- DropForeignKey
ALTER TABLE `TheoryForm` DROP FOREIGN KEY `TheoryForm_id_fkey`;

-- DropIndex
DROP INDEX `GTEForm_id_groupNumber_idx` ON `GTEForm`;

-- DropIndex
DROP INDEX `GTEForm_id_groupNumber_key` ON `GTEForm`;

-- AlterTable
ALTER TABLE `GTEForm` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `subjectId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`subjectId`, `groupNumber`);

-- AlterTable
ALTER TABLE `LTForm` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `groupNumber` INTEGER NOT NULL,
    ADD COLUMN `subjectId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`subjectId`, `groupNumber`);

-- AlterTable
ALTER TABLE `OtherForm` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `semester` INTEGER NOT NULL,
    ADD COLUMN `subjectId` VARCHAR(191) NOT NULL,
    ADD COLUMN `taAmount` INTEGER NOT NULL,
    ADD PRIMARY KEY (`subjectId`);

-- AlterTable
ALTER TABLE `ProjectBaseForm` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `groupNumber` INTEGER NOT NULL,
    ADD COLUMN `subjectId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`subjectId`, `groupNumber`);

-- AlterTable
ALTER TABLE `RefScheduleForm` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `groupNumber` INTEGER NOT NULL,
    ADD COLUMN `subjectId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`subjectId`, `groupNumber`);

-- AlterTable
ALTER TABLE `ResearchHelperForm` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `budgetYear` INTEGER NOT NULL,
    ADD COLUMN `fund` VARCHAR(191) NOT NULL,
    ADD COLUMN `subjectId` VARCHAR(191) NOT NULL,
    ADD COLUMN `taAmount` INTEGER NOT NULL,
    ADD PRIMARY KEY (`subjectId`);

-- AlterTable
ALTER TABLE `TheoryForm` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `groupNumber` INTEGER NOT NULL,
    ADD COLUMN `subjectId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`subjectId`, `groupNumber`);

-- CreateTable
CREATE TABLE `PeopleInResearchHelper` (
    `personId` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `salary` VARCHAR(191) NOT NULL,
    `hireDuration` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`personId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PeopleInOther` (
    `personId` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectId` VARCHAR(191) NOT NULL,
    `certificate` VARCHAR(191) NOT NULL,
    `hireDuration` VARCHAR(191) NOT NULL,
    `task` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`personId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GTEForm` ADD CONSTRAINT `GTEForm_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LTForm` ADD CONSTRAINT `LTForm_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefScheduleForm` ADD CONSTRAINT `RefScheduleForm_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TheoryForm` ADD CONSTRAINT `TheoryForm_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectBaseForm` ADD CONSTRAINT `ProjectBaseForm_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResearchHelperForm` ADD CONSTRAINT `ResearchHelperForm_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PeopleInResearchHelper` ADD CONSTRAINT `PeopleInResearchHelper_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `ResearchHelperForm`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OtherForm` ADD CONSTRAINT `OtherForm_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PeopleInOther` ADD CONSTRAINT `PeopleInOther_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `OtherForm`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;
