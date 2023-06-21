import { cache } from "react"
import { prisma } from "../libs/prisma/connector"

/**
 * @description ทำการตรวจสอบว่าสถานะของระบบเปิด หรือ ปิดอยู่
 */

const checkSystemStatus = cache(async () => {
  try {
    const status = await prisma.systemStatus.findFirst()
    return !status ? false : true
  } catch (error) {
    if (error instanceof Error) throw error
    if (typeof error == "string") throw new Error(error)
    throw new Error("ไม่สามารถตรวจสอบสถานะของระบบได้")
  }
})

export default checkSystemStatus