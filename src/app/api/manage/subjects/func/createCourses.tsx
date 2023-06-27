import { prisma } from "@/core/libs/prisma/connector";
import type { Course } from "@prisma/client";

const createCourses = async (courses: Course[]) => {
  console.log("กำลังบันทึกวิชาที่เปิดรับสมัคร...");
  // ไปแก้มา
  const createdCourses: Course[] = await Promise.all(
    courses.map((course) =>
      prisma.course.create({
        data: course,
      })
    )
  );

  return createdCourses;
};
export default createCourses;
