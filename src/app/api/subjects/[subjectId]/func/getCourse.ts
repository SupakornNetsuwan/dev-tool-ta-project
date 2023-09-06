import { prisma } from "@/core/libs/prisma/connector";
import type { FetchCourseType, FetchCourseTypeWithApprovementType } from "../CourseTypes";
import checkIsBasicDetailCompleted from "../helpers/checkIsBasicDetailCompleted";
import { Prisma } from "@prisma/client";

const getCourse = async (
  subjectId: string,
  includeOption: Prisma.CourseInclude = {}
): Promise<FetchCourseType | FetchCourseTypeWithApprovementType> => {

  const course = await prisma.course.findFirstOrThrow({
    where: {
      subjectId: subjectId,
    },
    include: {
      ...includeOption,
      professor: true,
    },
  });

  // ตรวจสอบความครบถ้วนของข้อมูล
  const isBasicDetailCompleted = checkIsBasicDetailCompleted(course)

  return { ...course, isBasicDetailCompleted };
};
export default getCourse;
