import { prisma } from "@/core/libs/prisma/connector";
import type { Course } from "@prisma/client";

const createCourse = async (courses: Course[]) => {
  console.log(`กำลังบันทึกวิชาที่เปิดรับสมัคร... `);
  courses.forEach((course) => console.log(`- ${course}`));

  const createdCourses = await prisma.course.createMany({
    data: courses,
  });
  
  return createdCourses;
};
export default createCourse;
