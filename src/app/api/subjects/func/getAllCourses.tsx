import { prisma } from "@/core/libs/prisma/connector";
import type { FetchCourseType } from "../[subjectId]/CourseTypes";
import checkIsBasicDetailCompleted from "../[subjectId]/helpers/checkIsBasicDetailCompleted";

const getAllCourse = async (professorId?: string): Promise<FetchCourseType[]> => {
  const courses = await prisma.course.findMany({
    ...(professorId && {
      where: {
        professorId,
      },
    }),
    include: {
      professor: true,
    },
  });

  const coursesWithIsBasicDetailCompleted = courses.map((course) => {
    const isBasicDetailCompleted = checkIsBasicDetailCompleted(course);
    return { ...course, isBasicDetailCompleted };
  });

  return coursesWithIsBasicDetailCompleted;
};
export default getAllCourse;
