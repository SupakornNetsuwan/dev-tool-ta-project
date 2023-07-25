-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_studentId_fkey`;

-- AlterTable
ALTER TABLE `Enroll` MODIFY `enrollDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
