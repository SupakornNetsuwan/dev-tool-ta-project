/*
  Warnings:

  - The values [OTHERS] on the enum `Course_approvalForm` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Course` MODIFY `approvalForm` ENUM('GTE_EIGHT', 'LT_EIGHT', 'REF_SCHEDULE', 'THEORY', 'PROJECTBASE', 'OTHER') NULL;
