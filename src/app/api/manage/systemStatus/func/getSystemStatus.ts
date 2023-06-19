import { prisma } from "@/core/libs/prisma/connector"

const getSystemStatus = async () => {
    const systemStatus = await prisma.systemStatus.findFirst({})
    return systemStatus
}

export default getSystemStatus