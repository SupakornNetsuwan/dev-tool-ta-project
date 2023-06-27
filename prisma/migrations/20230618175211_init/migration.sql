-- DropForeignKey
ALTER TABLE `Courses` DROP FOREIGN KEY `Courses_professorId_fkey`;

-- AlterTable
ALTER TABLE `Courses` MODIFY `professorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
