-- CreateTable
CREATE TABLE `SystemStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `openDate` DATETIME(3) NOT NULL,
    `closeDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
