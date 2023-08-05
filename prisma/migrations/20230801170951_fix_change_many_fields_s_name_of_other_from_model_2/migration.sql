/*
  Warnings:

  - You are about to drop the column `certificate` on the `OtherForm` table. All the data in the column will be lost.
  - You are about to drop the column `task` on the `OtherForm` table. All the data in the column will be lost.
  - Added the required column `taCertificate` to the `OtherForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taTask` to the `OtherForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OtherForm` DROP COLUMN `certificate`,
    DROP COLUMN `task`,
    ADD COLUMN `taCertificate` VARCHAR(191) NOT NULL,
    ADD COLUMN `taTask` VARCHAR(191) NOT NULL;
