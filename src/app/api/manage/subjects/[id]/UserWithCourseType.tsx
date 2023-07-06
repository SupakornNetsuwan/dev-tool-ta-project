import {  Prisma } from "@prisma/client";
const getUsersWithCourse =  Prisma.validator<Prisma.UserArgs>()({
    select: {
        id: true,
        fullname: true,
        Courses: true,
      },
})

export type ResponseGetUsersWithCourse = Prisma.UserGetPayload<typeof getUsersWithCourse>
