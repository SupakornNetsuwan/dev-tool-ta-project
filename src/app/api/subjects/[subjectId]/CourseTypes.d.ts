import { Prisma, User } from "@prisma/client";

export type FetchCourseType = Prisma.CourseGetPayload<{
    include: {
        professor: true
    },
}>

export type DetailCourseModifyType = Prisma.CourseGetPayload<{
    select: {
        title: true,
        firstname: true,
        lastname: true,
        subjectId: true,
        nameThai: true,
        contact: true,
        enrollCondition: true,
        secretCode: true,
    }
}> & Prisma.SystemStatusGetPayload<{
    select: {
        semester: true,
        year: true
    }
}>
