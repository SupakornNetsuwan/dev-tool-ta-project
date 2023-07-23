import { Course, Prisma } from "@prisma/client";

export type FetchCourseType = Prisma.CourseGetPayload<{
    include: {
        professor: true
    },
}> & { isBasicDetailCompleted: boolean }

export type UpdateCourseType = Prisma.CourseUpdateInput

export type CourseDetailModifyType = Prisma.CourseGetPayload<{
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
