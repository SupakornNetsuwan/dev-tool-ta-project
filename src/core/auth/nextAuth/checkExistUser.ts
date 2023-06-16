import { prisma } from "@/core/libs/prisma/connector"
import type { User } from "@prisma/client"
import bcrypt from "bcrypt"

type checkExistUserType = (
    username: string,
    password: string
) => Promise<User | null>

const checkExistUser: checkExistUserType = async (username, password) => {
    console.log("START-------------------\nกำลังตรวจสอบผู้ใช้ในฐานข้อมูลก่อน...")
    const user = await prisma.user.findUnique({
        where: {
            id: username
        }
    })

    user ? console.log("พบผู้ใช้อยู่ในฐานข้อมูล ตรวจสอบรหัสผ่าน...") : console.log("ไม่พบผู้ใช้ถูกบันทุกในฐานข้อมูล...")
    if (!user?.password) return null

    try {
        const isPasswordValid = await bcrypt.compare(password, user?.password)
        if (!isPasswordValid) throw new Error("รหัสผ่านไม่ตรงกันกับที่บันทึกในฐานข้อมูล. ลองเช็คที่ LDAP นะ (┬┬﹏┬┬)...")
        console.log("รหัสผ่านตรงกันกับที่บันทึกในฐานข้อมูล... ✨")
        return user;
    } catch (error) {
        if (error instanceof Object && !(error instanceof Error)) console.log(JSON.stringify(error)) // ถ้าเป็น Error มันก็เป็น Object ด้วย (เป็นการ Inherited) เลยเช็คว่าไม่เป็น Error ด้วย
        if (error instanceof Error) console.log(error.message)
        if (typeof error === "string") console.log(error.toString())
        return null
    }
}

export default checkExistUser