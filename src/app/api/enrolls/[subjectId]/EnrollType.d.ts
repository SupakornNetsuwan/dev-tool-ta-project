import { Prisma, Enroll } from "@prisma/client";

export type ResponseGetEnrollType = Prisma.EnrollGetPayload<{
        select: {
            
            passedInBenchelor:true,
            passedCourseId:true,
            passedCourseName:true
            degree:true
            courseBenchelor:true
            enrollStatus: true,
            grade:true
            student: {
                select: {
                    id: true,
                    fullname: true,
                }
            },
            course: {
                select: {
                    subjectId: true,
                    nameEng: true,
                    professor:{
                        select: {
                            fullname: true
                        }
                    }
                }
            }
        }
    }>
export type  ResponseGetEnrollsType = ResponseGetEnrollType[]