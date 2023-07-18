import { prisma } from "@/core/libs/prisma/connector"
import getSystemStatus from "./getSystemStatus"
import dayjs, { Dayjs } from "dayjs"

// ทำให้ใช้ type จากที่ export แทนจะได้มีความยืดหยุ่นในการเปลี่ยนแปลง

const createSystemStatus = async (openDate: Dayjs | null, closeDate: Dayjs | null) => {
    openDate = dayjs(openDate)
    closeDate = dayjs(closeDate)
    if (!openDate.isValid() || !closeDate.isValid()) throw new Error("วันที่ไม่สมบูรณ์")
    if (openDate.isAfter(closeDate)) throw new Error("วันเปิดลงทะเบียนต้องมาก่อนวันปิดลงทะเบียน")

    const transaction = await prisma.$transaction(async (tx) => {

        if (!openDate || !closeDate) throw new Error("วันที่ต้องไม่ว่างเปล่า")

        const gettedSystemStatus = await getSystemStatus() // เช็คว่ามีแล้วหรือยัง
        if (gettedSystemStatus) throw new Error("ระบบได้กำหนดช่วงวันลงทะเบียนไปแล้ว") // ถ้ามีสร้างไว้อยู่แล้ว จะไม่สามารถสร้างได้

        const createdSystemStatys = await prisma.systemStatus.create({ data: { openDate: openDate.toISOString(), closeDate: closeDate.toISOString() } })
        
        return createdSystemStatys
    })

    return transaction
}

export default createSystemStatus