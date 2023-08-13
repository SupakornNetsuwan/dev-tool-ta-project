import { prisma } from "@/core/libs/prisma/connector";

const getEnroll = async (subjectId: string) => {
  
  const Enroll = await prisma.enroll.findMany({
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
  return Enroll;
};
export default getEnroll;
