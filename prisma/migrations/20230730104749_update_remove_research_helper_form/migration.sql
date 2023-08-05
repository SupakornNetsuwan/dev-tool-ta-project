/*
  Warnings:

  - The values [RESEARCH_HELPER] on the enum `Course_approvalForm` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `PeopleInResearchHelper` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResearchHelperForm` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `courseId` on table `Enroll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `Enroll` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `PeopleInResearchHelper` DROP FOREIGN KEY `PeopleInResearchHelper_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `ResearchHelperForm` DROP FOREIGN KEY `ResearchHelperForm_subjectId_fkey`;

-- AlterTable
ALTER TABLE `Course` MODIFY `approvalForm` ENUM('GTE_EIGHT', 'LT_EIGHT', 'REF_SCHEDULE', 'THEORY', 'PROJECTBASE', 'OTHERS') NULL;

-- AlterTable
ALTER TABLE `Enroll` MODIFY `courseId` VARCHAR(191) NOT NULL,
    MODIFY `studentId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `PeopleInResearchHelper`;

-- DropTable
DROP TABLE `ResearchHelperForm`;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
