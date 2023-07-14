import { Prisma, User } from "@prisma/client";

export type FetchCourseType = Prisma.CourseGetPayload<{
    include: {
        professor: true
    },
}>
