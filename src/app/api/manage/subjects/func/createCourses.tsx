import { prisma } from "@/core/libs/prisma/connector";
import type { Course } from "@prisma/client";

const createCourses = async (courses: Course[]) => {
  console.log("กำลังบันทึกวิชาที่เปิดรับสมัคร...");
  const createdCourses = await prisma.course.createMany({
    data: courses,
  });

  return createdCourses;
};
export default createCourses;
