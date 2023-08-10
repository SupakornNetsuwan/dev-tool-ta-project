/*
  Warnings:

  - You are about to drop the column `courseBenchelor` on the `Enroll` table. All the data in the column will be lost.
  - You are about to drop the column `passedCourseId` on the `Enroll` table. All the data in the column will be lost.
  - You are about to drop the column `passedCourseName` on the `Enroll` table. All the data in the column will be lost.
  - You are about to drop the column `passedInBenchelor` on the `Enroll` table. All the data in the column will be lost.
  - The values [BANCHELOR_DEGREE] on the enum `Enroll_degree` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `courseInMajors` to the `Enroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passedCourse` to the `Enroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passedInMajors` to the `Enroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Enroll` DROP COLUMN `courseBenchelor`,
    DROP COLUMN `passedCourseId`,
    DROP COLUMN `passedCourseName`,
    DROP COLUMN `passedInBenchelor`,
    ADD COLUMN `courseInMajors` ENUM('INFORMATION_TECHNOLOGY', 'DATA_SCIENCE_AND_BUSINESS_ANALYTICS', 'BUSINESS_INFORMATION_TECHNOLOGY_INTERNATIONAL_PROGRAM', 'ARTIFICIAL_INTELLIGENCE_TECHNOLOGY') NOT NULL,
    ADD COLUMN `passedCourse` VARCHAR(191) NOT NULL,
    ADD COLUMN `passedInMajors` ENUM('INFORMATION_TECHNOLOGY', 'DATA_SCIENCE_AND_BUSINESS_ANALYTICS', 'BUSINESS_INFORMATION_TECHNOLOGY_INTERNATIONAL_PROGRAM', 'ARTIFICIAL_INTELLIGENCE_TECHNOLOGY') NOT NULL,
    MODIFY `degree` ENUM('BACHELOR_DEGREE', 'MASTER_DEGREE') NOT NULL;
