import { prisma } from "@/core/libs/prisma/connector"
import getSystemStatus from "./getSystemStatus"

const deleteSystemStatus = async () => {
    const transaction = await prisma.$transaction(async (tx) => {
        const gettedSystemStatus = await getSystemStatus() // เช็คช่วงการเปิดรับสมครที่จะลบ
        if (!gettedSystemStatus) throw new Error("ไม่พบช่วงเวลารับสมัครที่จะลบ")
        const deleted = await prisma.systemStatus.delete({
            where: {
                id: gettedSystemStatus.id
            }
        })
        return deleted
    })

    return transaction
}

export default deleteSystemStatus