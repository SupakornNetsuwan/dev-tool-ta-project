import { prisma } from "@/core/libs/prisma/connector";
import type { ResponseGetEnrollsType } from "../EnrollType";

const getEnroll = async (subjectId: string) => {
  
  const Enroll = await prisma.enroll.findMany({
    where: {
      course: {
        subjectId: subjectId,
      },
    },
    select: {
      passedInBenchelor:true,
      passedCourseId:true,
      passedCourseName:true,
      degree:true,
      courseBenchelor:true,
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
  return Enroll;
};
export default getEnroll;
