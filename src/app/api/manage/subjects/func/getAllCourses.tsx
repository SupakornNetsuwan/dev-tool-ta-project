import { prisma } from "@/core/libs/prisma/connector";

const getAllCourse = async () => {
  const courses = await prisma.course.findMany();
  return courses;
};
export default getAllCourse;
