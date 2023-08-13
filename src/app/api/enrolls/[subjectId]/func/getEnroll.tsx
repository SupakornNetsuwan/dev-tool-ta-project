import { prisma } from "@/core/libs/prisma/connector";
import type { ResponseGetEnrollsType } from "../EnrollType";

const getEnroll = async (subjectId: string) => {
  
  const enroll = await prisma.enroll.findMany({
    where: {
      course: {
        subjectId: subjectId,
      },
    },
    select: {
      passedInMajors:true,
      passedCourse:true,
      degree:true,
      courseInMajors:true,
      enrollStatus: true,
      grade:true,
      student: {
        select: {
          id: true,
          fullname: true,
        },
      },
      course: {
        select: {
          subjectId: true,
          nameEng: true,
          professor:{
            select:{
              fullname:true
            }
          }
        },
      },
    },
  });
  
  return enroll;
};
export default getEnroll;
