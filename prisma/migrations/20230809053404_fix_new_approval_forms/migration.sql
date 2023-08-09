/*
  Warnings:

  - The values [GTE_EIGHT,LT_EIGHT,REF_SCHEDULE,OTHER] on the enum `Course_approvalForm` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `otherTaTeachDay` on the `ProjectBaseForm` table. All the data in the column will be lost.
  - You are about to drop the column `otherTaWorkDay` on the `ProjectBaseForm` table. All the data in the column will be lost.
  - You are about to drop the column `otherTaTeachDay` on the `TheoryForm` table. All the data in the column will be lost.
  - You are about to drop the column `otherTaWorkDay` on the `TheoryForm` table. All the data in the column will be lost.
  - You are about to drop the `GTEForm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LTForm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OtherForm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefScheduleForm` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `taAmount` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taOtherWorkDay` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taOtherWorkDayEnd` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taOtherWorkDayStart` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taWorkDay` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taWorkDayEnd` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taWorkDayStart` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taAmount` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taOtherWorkDay` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taOtherWorkDayEnd` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taOtherWorkDayStart` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taWorkDay` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taWorkDayEnd` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taWorkDayStart` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `GTEForm` DROP FOREIGN KEY `GTEForm_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `LTForm` DROP FOREIGN KEY `LTForm_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `OtherForm` DROP FOREIGN KEY `OtherForm_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `RefScheduleForm` DROP FOREIGN KEY `RefScheduleForm_subjectId_fkey`;

-- AlterTable
ALTER TABLE `Course` MODIFY `approvalForm` ENUM('PRACTICE', 'THEORY', 'PROJECTBASE') NULL;

-- AlterTable
ALTER TABLE `ProjectBaseForm` DROP COLUMN `otherTaTeachDay`,
    DROP COLUMN `otherTaWorkDay`,
    ADD COLUMN `taAmount` INTEGER NOT NULL,
    ADD COLUMN `taOtherWorkDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `taOtherWorkDayEnd` TIME NOT NULL,
    ADD COLUMN `taOtherWorkDayStart` TIME NOT NULL,
    ADD COLUMN `taWorkDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `taWorkDayEnd` TIME NOT NULL,
    ADD COLUMN `taWorkDayStart` TIME NOT NULL;

-- AlterTable
ALTER TABLE `TheoryForm` DROP COLUMN `otherTaTeachDay`,
    DROP COLUMN `otherTaWorkDay`,
    ADD COLUMN `taAmount` INTEGER NOT NULL,
    ADD COLUMN `taOtherWorkDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `taOtherWorkDayEnd` TIME NOT NULL,
    ADD COLUMN `taOtherWorkDayStart` TIME NOT NULL,
    ADD COLUMN `taWorkDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `taWorkDayEnd` TIME NOT NULL,
    ADD COLUMN `taWorkDayStart` TIME NOT NULL;

-- DropTable
DROP TABLE `GTEForm`;

-- DropTable
DROP TABLE `LTForm`;

-- DropTable
DROP TABLE `OtherForm`;

-- DropTable
DROP TABLE `RefScheduleForm`;

-- CreateTable
CREATE TABLE `PracticeForm` (
    `subjectId` VARCHAR(191) NOT NULL,
    `groupNumber` INTEGER NOT NULL,
    `studentAmount` INTEGER NOT NULL,
    `taAmount` INTEGER NOT NULL,
    `taWorkDay` VARCHAR(191) NOT NULL,
    `taWorkDayStart` TIME NOT NULL,
    `taWorkDayEnd` TIME NOT NULL,
    `taOtherWorkDay` VARCHAR(191) NOT NULL,
    `taOtherWorkDayStart` TIME NOT NULL,
    `taOtherWorkDayEnd` TIME NOT NULL,
    `taHireDuration` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`subjectId`, `groupNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PracticeForm` ADD CONSTRAINT `PracticeForm_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;
