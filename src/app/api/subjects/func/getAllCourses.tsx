import { prisma } from "@/core/libs/prisma/connector";
import type { FetchCourseType } from "../[subjectId]/CourseTypes";

const getAllCourse = async (): Promise<FetchCourseType[]> => {
  const courses = await prisma.course.findMany({
    include: {
      professor: true,
    },
  });

  return courses;
};
export default getAllCourse;
