-- AlterTable
ALTER TABLE `Enroll` MODIFY `enrollStatus` ENUM('PENDING', 'APPROVED', 'FINAL_APPROVED') NOT NULL;