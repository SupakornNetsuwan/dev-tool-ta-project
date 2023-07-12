import { prisma } from "@/core/libs/prisma/connector";
import { Course } from "@prisma/client";

const getCourse = async (queryParams: string): Promise<Course> => {

  const course = await prisma.course.findFirstOrThrow({
    where: {
      nameEng: queryParams,
    }
  });

  return course;
};
export default getCourse;
