-- AlterTable
ALTER TABLE `Course` MODIFY `creationStatus` ENUM('ENROLLABLE', 'CREATED', 'UNCREATED') NULL DEFAULT 'UNCREATED';
