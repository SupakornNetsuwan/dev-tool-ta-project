import { prisma } from "@/core/libs/prisma/connector";
import { ResponseGetEnrollsType } from "../EnrollType";
import { EnrollStatus } from "@prisma/client";

export const getEnroll = async (subjectId: string, enrollStattus: EnrollStatus): Promise<ResponseGetEnrollsType> => {
  const enroll = await prisma.enroll.findMany({
    where: {
      course: {
        subjectId: subjectId,
      },
      // เงื่อนไขในการดึงว่าต้องการอะไรเฉพาะสถานะใดเป็นพิเศษมั้ย
      ...(enrollStattus && { enrollStatus: enrollStattus }),
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