-- CreateTable
CREATE TABLE `ProjectBaseForm` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResearchHelperForm` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OtherForm` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectBaseForm` ADD CONSTRAINT `ProjectBaseForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResearchHelperForm` ADD CONSTRAINT `ResearchHelperForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OtherForm` ADD CONSTRAINT `OtherForm_id_fkey` FOREIGN KEY (`id`) REFERENCES `Course`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;
