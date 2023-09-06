import { prisma } from "@/core/libs/prisma/connector";
import { ResponseGetEnrollsType } from "../EnrollType";

const getEnroll = async (subjectId: string): Promise<ResponseGetEnrollsType> => {
  const enroll = await prisma.enroll.findMany({
    where: {
      course: {
        subjectId: subjectId,
      },
    },
    select: {
      passedInMajors: true,
      passedCourse: true,
      degree: true,
      courseInMajors: true,
      enrollStatus: true,
      grade: true,
      student: {
        select: {
          id: true,
          Profile: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      },
      course: {
        select: {
          subjectId: true,
          nameEng: true,
          professor: {
            select: {
              fullname: true,
            },
          },
        },
      },
    },
  });

  return enroll;
};
export default getEnroll;
