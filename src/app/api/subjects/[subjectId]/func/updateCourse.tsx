import { prisma } from "@/core/libs/prisma/connector";
import type { Course } from "@prisma/client";
import type { FetchCourseType } from "../CourseTypes";

const updateCourse = async (payload: Partial<Course>, subjectId: string): Promise<FetchCourseType> => {
  const response = await prisma.course.update({
    where: {
      subjectId: subjectId,
    },
    data: payload,
    include: {
      professor: true,
    },
  });

  return response;
};

export default updateCourse;
