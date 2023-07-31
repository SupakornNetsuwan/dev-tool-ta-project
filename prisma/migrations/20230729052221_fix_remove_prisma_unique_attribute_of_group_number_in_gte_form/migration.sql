/*
  Warnings:

  - A unique constraint covering the columns `[id,groupNumber]` on the table `GTEForm` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `GTEForm_groupNumber_key` ON `GTEForm`;

-- CreateIndex
CREATE UNIQUE INDEX `GTEForm_id_groupNumber_key` ON `GTEForm`(`id`, `groupNumber`);
