/*
  Warnings:

  - Added the required column `otherTaWorkDay` to the `LTForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAmount` to the `LTForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taAmount` to the `LTForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taHireDuration` to the `LTForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taWorkDay` to the `LTForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherTaWorkDay` to the `RefScheduleForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAmount` to the `RefScheduleForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taAmount` to the `RefScheduleForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taHireDuration` to the `RefScheduleForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taWorkDay` to the `RefScheduleForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LTForm` ADD COLUMN `otherTaWorkDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `studentAmount` INTEGER NOT NULL,
    ADD COLUMN `taAmount` INTEGER NOT NULL,
    ADD COLUMN `taHireDuration` VARCHAR(191) NOT NULL,
    ADD COLUMN `taWorkDay` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `RefScheduleForm` ADD COLUMN `otherTaWorkDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `studentAmount` INTEGER NOT NULL,
    ADD COLUMN `taAmount` INTEGER NOT NULL,
    ADD COLUMN `taHireDuration` VARCHAR(191) NOT NULL,
    ADD COLUMN `taWorkDay` VARCHAR(191) NOT NULL;
