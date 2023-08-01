    import { Prisma, Enroll } from "@prisma/client";

export type ResponseGetEnrollType = Prisma.EnrollGetPayload<{
        select: {
            enrollStatus: true,
            enrollId: true,
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
                    nameThai:true
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