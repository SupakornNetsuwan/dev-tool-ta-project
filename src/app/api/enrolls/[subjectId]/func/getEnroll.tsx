import { prisma } from "@/core/libs/prisma/connector";
import { ResponseGetEnrollsType } from "../EnrollType";
import { EnrollStatus } from "@prisma/client";
export  const getEnroll = async (subjectId: string, enrollStattus: EnrollStatus): Promise<ResponseGetEnrollsType> => {
  const enroll = await prisma.enroll.findMany({
    where: {
      course: {
        subjectId: subjectId,
      },
      //ทำการดึงข้อมูลของผู้สมัครที่มีสถานะ FINAL_APPROVED แล้วเท่านั้น
      enrollStatus: enrollStattus
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

export const getEnrolls = async (subjectId: string, enrollStatus: EnrollStatus): Promise<ResponseGetEnrollsType> => {
  const enrolls = await prisma.enroll.findMany({
    where: {
      //ทำการดึงข้อมูลของผู้สมัครที่มีสถานะ FINAL_APPROVED แล้วเท่านั้น
      enrollStatus: enrollStatus
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

  return enrolls;
};

