/*
  Warnings:

  - You are about to drop the `Courses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Courses` DROP FOREIGN KEY `Courses_professorId_fkey`;

-- DropTable
DROP TABLE `Courses`;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `professorId` VARCHAR(191) NULL,
    `mameEng` VARCHAR(191) NOT NULL,
    `nameThai` VARCHAR(191) NOT NULL,
    `credit` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
