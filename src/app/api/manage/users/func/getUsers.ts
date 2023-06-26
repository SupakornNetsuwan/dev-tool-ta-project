import { prisma } from "@/core/libs/prisma/connector"
import type { ResponseGetUsersType } from "../UsersType";

const getUsers = async (): Promise<ResponseGetUsersType> => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            fullname: true,
            role: true
        }
    })

    return users
}

export default getUsers