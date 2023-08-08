import { prisma } from "@/core/libs/prisma/connector"
import { Prisma } from "@prisma/client"

const getAllCoursesWithEnroll = async (userId: string) => {
    return await prisma.course.findMany({
        where: {
            
        }
    })
}

export default getAllCoursesWithEnroll