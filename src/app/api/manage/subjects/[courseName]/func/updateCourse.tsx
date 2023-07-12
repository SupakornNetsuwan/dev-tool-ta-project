import { prisma } from "@/core/libs/prisma/connector";
// type
import type { Course } from "@prisma/client";
import type { UpdateCourseType } from "../CourseTypes";

const updateCourse = async (body: Partial<Course>): Promise<UpdateCourseType> => {
  const response = await prisma.course.update({
    where: { subjectId: body.subjectId },
    data: body,
    include: {
      professor: true,
    },
  });

  return response;
};

export default updateCourse;
