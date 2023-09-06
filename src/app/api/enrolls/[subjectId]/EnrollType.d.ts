import { Prisma, Enroll } from "@prisma/client";

export type ResponseGetEnrollType = Prisma.EnrollGetPayload<{
    select: {
        passedInMajors: true,
        passedCourse: true,
        degree: true
        courseInMajors: true
        enrollStatus: true,
        grade: true,
        student: {
            select: {
                id: true,
                Profile: {
                    select: {
                        firstname: true,
                        lastname: true,
                    }
                }
            }
        },
        course: {
            select: {
                subjectId: true,
                nameEng: true,
                professor: {
                    select: {
                        fullname: true
                    }
                }
            }
        }
    }
}>
export type ResponseGetEnrollsType = ResponseGetEnrollType[]