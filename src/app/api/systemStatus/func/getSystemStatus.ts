import { prisma } from "@/core/libs/prisma/connector"
import { Prisma } from "@prisma/client"
import type { SystemStatusResponseType } from "../SystemStatusType"
import dayjs from "dayjs"

const getSystemStatus = async (): Promise<SystemStatusResponseType> => {
    try {
        const systemStatus = await prisma.systemStatus.findFirstOrThrow({})
        
        if (dayjs(systemStatus.closeDate).diff() < 0 || dayjs(systemStatus.openDate).diff() > 0) {
            return { ...systemStatus, isOpen: false }
        }

        return { ...systemStatus, isOpen: true }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") return undefined
        }
    }
}

export default getSystemStatus