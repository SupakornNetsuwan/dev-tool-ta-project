import { prisma } from "@/core/libs/prisma/connector";
import type { Prisma } from "@prisma/client";

const createCourse = async (courses: Prisma.CourseCreateManyInput[]) => {
  console.log(`กำลังบันทึกวิชาที่เปิดรับสมัคร... `);
  courses.forEach((course) => console.log(`- ${course.nameThai} (${course.nameEng})`));

  const createdCourses = await prisma.course.createMany({
    data: courses,
  });

  return createdCourses;
};
export default createCourse;
