/*
  Warnings:

  - The primary key for the `Courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courseDes` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `courseNameEng` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `courseNameThai` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `id` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mameEng` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameThai` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Courses` DROP PRIMARY KEY,
    DROP COLUMN `courseDes`,
    DROP COLUMN `courseId`,
    DROP COLUMN `courseNameEng`,
    DROP COLUMN `courseNameThai`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `mameEng` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameThai` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
