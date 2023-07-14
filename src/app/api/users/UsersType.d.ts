import { Prisma, User } from "@prisma/client"

type ResponseGetUserType = Prisma.UserGetPayload<{
    select: {
        id: true,
        email: true,
        fullname: true,
        role: true,
    }
}>
export type ResponseGetUsersType = ResponseGetUserType[]
