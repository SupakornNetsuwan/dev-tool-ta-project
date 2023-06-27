-- CreateTable
CREATE TABLE `Courses` (
    `course_id` VARCHAR(191) NOT NULL,
    `course_name_eng` VARCHAR(191) NOT NULL,
    `course_name_thai` VARCHAR(191) NOT NULL,
    `credit` VARCHAR(191) NOT NULL,
    `course_des` VARCHAR(191) NOT NULL,
    `professor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Courses_course_id_key`(`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
