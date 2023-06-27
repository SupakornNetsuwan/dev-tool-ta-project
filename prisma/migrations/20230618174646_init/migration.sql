/*
  Warnings:

  - You are about to drop the column `course_des` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `course_id` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `course_name_eng` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `course_name_thai` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `professor` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `courseDes` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseNameEng` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseNameThai` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Courses_course_id_key` ON `Courses`;

-- AlterTable
ALTER TABLE `Courses` DROP COLUMN `course_des`,
    DROP COLUMN `course_id`,
    DROP COLUMN `course_name_eng`,
    DROP COLUMN `course_name_thai`,
    DROP COLUMN `professor`,
    ADD COLUMN `courseDes` VARCHAR(191) NOT NULL,
    ADD COLUMN `courseId` VARCHAR(191) NOT NULL,
    ADD COLUMN `courseNameEng` VARCHAR(191) NOT NULL,
    ADD COLUMN `courseNameThai` VARCHAR(191) NOT NULL,
    ADD COLUMN `professorId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`courseId`);

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
