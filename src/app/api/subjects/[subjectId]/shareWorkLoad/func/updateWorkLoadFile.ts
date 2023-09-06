import { prisma } from "@/core/libs/prisma/connector"

const updateWorkLoadFile = async (subjectId: string, shareWorkloadFilePath: string) => {
    return await prisma.course.update({
        where: {
            subjectId: subjectId
        },
        data: {
            shareWorkloadFile: shareWorkloadFilePath
        }
    })
}

export default updateWorkLoadFile