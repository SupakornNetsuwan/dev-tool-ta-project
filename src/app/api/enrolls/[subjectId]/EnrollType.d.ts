    import { Prisma, Enroll } from "@prisma/client";

export type ResponseGetEnrollType = Prisma.EnrollGetPayload<{
        select: {
            PassedInBenchelor:true,
            passedCourseId:true,
            passedCourseName
            Degree:true
            courseBenchelor:true
            enrollStatus: true,
            enrollId: true,
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