-- AlterTable
ALTER TABLE `Course` ADD COLUMN `contact` VARCHAR(191) NULL,
    ADD COLUMN `enrollCondition` VARCHAR(191) NULL,
    ADD COLUMN `firstname` VARCHAR(191) NULL,
    ADD COLUMN `lastname` VARCHAR(191) NULL,
    ADD COLUMN `secretCode` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL DEFAULT 'นาย';
