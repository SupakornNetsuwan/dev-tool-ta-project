/*
  Warnings:

  - The primary key for the `Enroll` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `enrollId` on the `Enroll` table. All the data in the column will be lost.
  - Made the column `courseId` on table `Enroll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `Enroll` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_studentId_fkey`;

-- DropIndex
DROP INDEX `Enroll_courseId_studentId_key` ON `Enroll`;

-- DropIndex
DROP INDEX `Enroll_enrollId_key` ON `Enroll`;

-- AlterTable
ALTER TABLE `Enroll` DROP PRIMARY KEY,
    DROP COLUMN `enrollId`,
    MODIFY `courseId` VARCHAR(191) NOT NULL,
    MODIFY `studentId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`courseId`, `studentId`);

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
