/*
  Warnings:

  - You are about to drop the column `passedinBenchelor` on the `Enroll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Enroll` DROP COLUMN `passedinBenchelor`,
    ADD COLUMN `passedInBenchelor` ENUM('INFORMATION_TECHNOLOGY', 'DATA_SCIENCE_AND_BUSINESS_ANALYTICS') NULL;
