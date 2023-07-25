-- CreateTable
CREATE TABLE `Enroll` (
    `enrollId` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollDate` DATETIME(3) NOT NULL,
    `enrollStatus` ENUM('PENDING', 'APPROVED') NOT NULL,
    `courseId` VARCHAR(191) NULL,
    `studentId` VARCHAR(191) NULL,

    UNIQUE INDEX `Enroll_enrollId_key`(`enrollId`),
    UNIQUE INDEX `Enroll_courseId_studentId_key`(`courseId`, `studentId`),
    PRIMARY KEY (`enrollId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`subjectId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
