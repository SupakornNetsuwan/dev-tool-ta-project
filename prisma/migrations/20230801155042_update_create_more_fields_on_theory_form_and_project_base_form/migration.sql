/*
  Warnings:

  - Added the required column `otherTaTeachDay` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherTaWorkDay` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAmount` to the `ProjectBaseForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherTaTeachDay` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherTaWorkDay` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAmount` to the `TheoryForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProjectBaseForm` ADD COLUMN `otherTaTeachDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `otherTaWorkDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `studentAmount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TheoryForm` ADD COLUMN `otherTaTeachDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `otherTaWorkDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `studentAmount` INTEGER NOT NULL;
