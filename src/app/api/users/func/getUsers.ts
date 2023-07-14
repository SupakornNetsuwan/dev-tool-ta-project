import { prisma } from "@/core/libs/prisma/connector"
import type { ResponseGetUsersType } from "../UsersType";
import { Role } from "@prisma/client";

export const dynamic = "force-dynamic"

const getUsers = async (role?: Role): Promise<ResponseGetUsersType> => {

    const users = await prisma.user.findMany({
        where: {
            ...(role && { role })
        },
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