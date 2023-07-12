import { Prisma, User } from "@prisma/client";

export type UpdateCourseType = Prisma.CourseGetPayload<{
    include: {
        professor: true
    },
}>
