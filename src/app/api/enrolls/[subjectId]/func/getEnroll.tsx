import { prisma } from "@/core/libs/prisma/connector";
import { ResponseGetEnrollsType } from "../EnrollType";

const getEnroll = async (subjectId: string): Promise<ResponseGetEnrollsType> => {
  const enroll = await prisma.enroll.findMany({
    where: {
      course: {
        subjectId: subjectId,
      },
      //ทำการดึงข้อมูลของผู้สมัครที่มีสถานะ FINAL_APPROVED แล้วเท่านั้น
      enrollStatus:'FINAL_APPROVED'
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
