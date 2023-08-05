/*
  Warnings:

  - A unique constraint covering the columns `[groupNumber]` on the table `GTEForm` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupNumber` to the `GTEForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAmount` to the `GTEForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taAmount` to the `GTEForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taHireDuration` to the `GTEForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taWorkDay` to the `GTEForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GTEForm` ADD COLUMN `groupNumber` INTEGER NOT NULL,
    ADD COLUMN `studentAmount` INTEGER NOT NULL,
    ADD COLUMN `taAmount` INTEGER NOT NULL,
    ADD COLUMN `taHireDuration` VARCHAR(191) NOT NULL,
    ADD COLUMN `taWorkDay` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `GTEForm_groupNumber_key` ON `GTEForm`(`groupNumber`);

-- CreateIndex
CREATE INDEX `GTEForm_id_groupNumber_idx` ON `GTEForm`(`id`, `groupNumber`);
