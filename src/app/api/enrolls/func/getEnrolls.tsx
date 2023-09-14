import { prisma } from "@/core/libs/prisma/connector";
import { ResponseGetEnrollsType } from "../[subjectId]/EnrollType";
import { EnrollStatus } from "@prisma/client";

export const getEnrolls = async ( enrollStattus: EnrollStatus): Promise<ResponseGetEnrollsType> => {
  const enroll = await prisma.enroll.findMany({
    where: {
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