/*
  Warnings:

  - You are about to drop the column `approvalFrom` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `approvalFrom`,
    ADD COLUMN `approvalForm` ENUM('GTE_EIGHT', 'LT_EIGHT', 'REF_SCHEDULE', 'THEORY', 'PROJECTBASE', 'RESEARCH_HELPER', 'OTHERS') NULL;
