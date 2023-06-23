import { prisma } from "@/core/libs/prisma/connector"
import { Role } from "@prisma/client"
import bcrypt from "bcrypt"

/**
 * @description สำหรับทำการสร้างผู้ใช้ใหม่ขึ้นมาชั่วคราวเท่านั้น
 */

const createFakeUser = async (username: string, password: string, fullname?: string, role?: Role) => {
    console.log("กำลังสร้างผู้ใช้ทดสอบ...")
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await prisma.user.create({
        data: {
            id: username,
            email: `${username}@kmitl.ac.th`,
            fullname: fullname || "John smith",
            password: hashedPassword,
            role: role || "STUDENT",
            department: "it"
        }
    })
    return newUser
}

export default createFakeUser