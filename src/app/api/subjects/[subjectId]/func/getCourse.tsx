import { prisma } from "@/core/libs/prisma/connector";
import type { FetchCourseType } from "../CourseTypes";

const getCourse = async (subjectId: string): Promise<FetchCourseType> => {
  const course = await prisma.course.findFirstOrThrow({
    where: {
      subjectId: subjectId,
    },
    include: {
      professor: true,
    },
  });

  return course;
};
export default getCourse;
