-- DropForeignKey
ALTER TABLE `GTEForm` DROP FOREIGN KEY `GTEForm_id_fkey`;

-- DropForeignKey
ALTER TABLE `LTForm` DROP FOREIGN KEY `LTForm_id_fkey`;

-- DropForeignKey
ALTER TABLE `RefScheduleForm` DROP FOREIGN KEY `RefScheduleForm_id_fkey`;

-- DropForeignKey
ALTER TABLE `TheoryForm` DROP FOREIGN KEY `TheoryForm_id_fkey`;

-- AddForeignKey
ALTER TABLE `GTEForm` ADD CONSTRAINT `GTEForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LTForm` ADD CONSTRAINT `LTForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefScheduleForm` ADD CONSTRAINT `RefScheduleForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TheoryForm` ADD CONSTRAINT `TheoryForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;
