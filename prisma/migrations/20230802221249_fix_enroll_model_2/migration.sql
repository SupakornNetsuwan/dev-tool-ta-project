/*
  Warnings:

  - You are about to drop the column `courseBenchelor` on the `Enroll` table. All the data in the column will be lost.
  - You are about to drop the column `degree` on the `Enroll` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `Enroll` table. All the data in the column will be lost.
  - You are about to drop the column `passedInBenchelor` on the `Enroll` table. All the data in the column will be lost.
  - Added the required column `CourseBenchelor` to the `Enroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Degree` to the `Enroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Grade` to the `Enroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PassedInBenchelor` to the `Enroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Enroll` DROP COLUMN `courseBenchelor`,
    DROP COLUMN `degree`,
    DROP COLUMN `grade`,
    DROP COLUMN `passedInBenchelor`,
    ADD COLUMN `CourseBenchelor` ENUM('INFORMATION_TECHNOLOGY', 'DATA_SCIENCE_AND_BUSINESS_ANALYTICS') NOT NULL,
    ADD COLUMN `Degree` ENUM('BANCHELOR_DEGREE', 'MASTER_DEGREE') NOT NULL,
    ADD COLUMN `Grade` ENUM('A', 'B_PLUS', 'B', 'C_PLUS', 'C', 'D_PLUS', 'D', 'F') NOT NULL,
    ADD COLUMN `PassedInBenchelor` ENUM('INFORMATION_TECHNOLOGY', 'DATA_SCIENCE_AND_BUSINESS_ANALYTICS') NOT NULL;
