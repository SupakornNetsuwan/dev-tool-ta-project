import { prisma } from "@/core/libs/prisma/connector"
import type { User } from "@prisma/client"
import type { ResponseGetUsersType } from "../UsersType"

const updateUser = async (body: Partial<User>) : Promise<ResponseGetUsersType[number]>  => {
    const response = await prisma.user.update({
        where: { id: body.id },
        data: body,
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