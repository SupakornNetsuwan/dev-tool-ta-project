-- AlterTable
ALTER TABLE `Course` ADD COLUMN `approvalFrom` ENUM('GTE_EIGHT', 'LT_EIGHT', 'REF_SCHEDULE', 'THEORY', 'PROJECTBASE', 'RESEARCH_HELPER', 'OTHERS') NULL;

-- CreateTable
CREATE TABLE `GTEForm` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LTForm` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefScheduleForm` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TheoryForm` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GTEForm` ADD CONSTRAINT `GTEForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LTForm` ADD CONSTRAINT `LTForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefScheduleForm` ADD CONSTRAINT `RefScheduleForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TheoryForm` ADD CONSTRAINT `TheoryForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;
