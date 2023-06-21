import { prisma } from "@/core/libs/prisma/connector"
import { Role } from "@prisma/client";

export type GetUsersType = {
    id: string;
    email: string;
    fullname: string;
    role: Role;
}[]

const getUsers = async (): Promise<GetUsersType> => {
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