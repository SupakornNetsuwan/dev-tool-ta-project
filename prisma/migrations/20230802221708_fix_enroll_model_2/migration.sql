/*
  Warnings:

  - You are about to drop the column `CourseBenchelor` on the `Enroll` table. All the data in the column will be lost.
  - You are about to drop the column `Degree` on the `Enroll` table. All the data in the column will be lost.
  - You are about to drop the column `Grade` on the `Enroll` table. All the data in the column will be lost.
  - You are about to drop the column `PassedInBenchelor` on the `Enroll` table. All the data in the column will be lost.
  - Added the required column `courseBenchelor` to the `Enroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `degree` to the `Enroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Enroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passedInBenchelor` to the `Enroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Enroll` DROP COLUMN `CourseBenchelor`,
    DROP COLUMN `Degree`,
    DROP COLUMN `Grade`,
    DROP COLUMN `PassedInBenchelor`,
    ADD COLUMN `courseBenchelor` ENUM('INFORMATION_TECHNOLOGY', 'DATA_SCIENCE_AND_BUSINESS_ANALYTICS') NOT NULL,
    ADD COLUMN `degree` ENUM('BANCHELOR_DEGREE', 'MASTER_DEGREE') NOT NULL,
    ADD COLUMN `grade` ENUM('A', 'B_PLUS', 'B', 'C_PLUS', 'C', 'D_PLUS', 'D', 'F') NOT NULL,
    ADD COLUMN `passedInBenchelor` ENUM('INFORMATION_TECHNOLOGY', 'DATA_SCIENCE_AND_BUSINESS_ANALYTICS') NOT NULL;
