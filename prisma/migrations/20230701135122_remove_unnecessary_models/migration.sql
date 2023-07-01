/*
  Warnings:

  - You are about to drop the column `age` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `EducationRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScholarshipRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `EducationRecord` DROP FOREIGN KEY `EducationRecord_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ScholarshipRecord` DROP FOREIGN KEY `ScholarshipRecord_userId_fkey`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `age`,
    DROP COLUMN `dateOfBirth`,
    DROP COLUMN `nationality`,
    DROP COLUMN `religion`;

-- DropTable
DROP TABLE `EducationRecord`;

-- DropTable
DROP TABLE `ScholarshipRecord`;
