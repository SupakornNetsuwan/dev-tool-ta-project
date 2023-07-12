/*
  Warnings:

  - You are about to drop the column `carrer` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `carrerAddress` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `carrerPosition` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `educationExpenseFrom` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `carrer`,
    DROP COLUMN `carrerAddress`,
    DROP COLUMN `carrerPosition`,
    DROP COLUMN `educationExpenseFrom`,
    DROP COLUMN `income`;
