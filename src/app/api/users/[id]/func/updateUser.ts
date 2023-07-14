import { prisma } from "@/core/libs/prisma/connector"
import type { User } from "@prisma/client"
import type { ResponseGetUsersType } from "../../UsersType"

const updateUser = async (payload: Partial<User>, id: string): Promise<ResponseGetUsersType[number]> => {
    const response = await prisma.user.update({
        where: { id: id },
        data: payload,
        select: {
            id: true,
            email: true,
            fullname: true,
            role: true
        }
    })

    return response
}

export default updateUser