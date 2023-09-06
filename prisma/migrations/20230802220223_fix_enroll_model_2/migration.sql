/*
  Warnings:

  - Made the column `courseBenchelor` on table `Enroll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `degree` on table `Enroll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `grade` on table `Enroll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passedCourseId` on table `Enroll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passedCourseName` on table `Enroll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passedInBenchelor` on table `Enroll` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Enroll` MODIFY `courseBenchelor` ENUM('INFORMATION_TECHNOLOGY', 'DATA_SCIENCE_AND_BUSINESS_ANALYTICS') NOT NULL,
    MODIFY `degree` ENUM('BANCHELOR_DEGREE', 'MASTER_DEGREE') NOT NULL,
    MODIFY `grade` ENUM('A', 'B_PLUS', 'B', 'C_PLUS', 'C', 'D_PLUS', 'D', 'F') NOT NULL,
    MODIFY `passedCourseId` VARCHAR(191) NOT NULL,
    MODIFY `passedCourseName` VARCHAR(191) NOT NULL,
    MODIFY `passedInBenchelor` ENUM('INFORMATION_TECHNOLOGY', 'DATA_SCIENCE_AND_BUSINESS_ANALYTICS') NOT NULL;
