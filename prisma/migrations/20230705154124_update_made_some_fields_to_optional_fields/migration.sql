/*
  Warnings:

  - You are about to drop the column `studentId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserDocument` DROP FOREIGN KEY `UserDocument_userId_fkey`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `studentId`,
    MODIFY `address` MEDIUMTEXT NULL;

-- AlterTable
ALTER TABLE `UserDocument` MODIFY `picturePath` VARCHAR(191) NULL,
    MODIFY `transcriptPath` VARCHAR(191) NULL,
    MODIFY `classTablePath` VARCHAR(191) NULL,
    MODIFY `bookBankPath` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `UserDocument` ADD CONSTRAINT `UserDocument_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
