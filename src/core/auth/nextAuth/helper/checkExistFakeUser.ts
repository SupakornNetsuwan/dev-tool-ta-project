import { prisma } from "@/core/libs/prisma/connector"
import bcrypt from "bcrypt"

const checkExistFakeUser = async (username: string, password: string) => {
    console.log("START-------------------\nกำลังตรวจสอบผู้ใช้ทดสอบในฐานข้อมูลก่อน...")
    const fakeUser = await prisma.user.findUnique({
        where: {
            id: username
        }
    })

    if (!fakeUser) return fakeUser;
    const compareResult = await bcrypt.compare(password, fakeUser?.password)
    if (!compareResult) throw new Error("รหัสผ่านผู้ใช้ทดสอบไม่ตรงกับที่กำหนดไว้")
    console.log("รหัสผ่านผู้ใช้ทดสอบตรงกันกับที่บันทึกในฐานข้อมูล... ✨")
    return fakeUser;
}

export default checkExistFakeUser