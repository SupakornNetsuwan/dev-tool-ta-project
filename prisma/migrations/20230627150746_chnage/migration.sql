/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Course` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `subjectId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`subjectId`);
