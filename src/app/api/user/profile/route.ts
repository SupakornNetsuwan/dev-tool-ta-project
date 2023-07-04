import { NextRequest, NextResponse } from "next/server"
import checkAuth from "@/core/func/checkAuth"
import getProfile from "./func/getProfile"
import type { ProfileFormType as PayloadProfileFormType } from "@/app/profile/types/ProfileFormType"
// Form upload handling
import fileUploadHandler from "@/core/func/fileUploadHandler"

export const GET = async (request: NextRequest) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "PROFESSOR", "STUDENT", "SUPERADMIN"])
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const profile = await getProfile(session.user.id);
        return NextResponse.json({ message: "ดึงข้อมูลโปรไฟล์ของผู้ใช้งานสำเร็จ", data: profile })
    } catch (error) {
        // หากเกิด error ให้ทำการตรวจสอบ error และตอบกลับ
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}

export const PATCH = async (request: NextRequest & { url: string }) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "PROFESSOR", "STUDENT", "SUPERADMIN"])
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const formData = await request.formData();
        const { firstname, lastname, title, address, phoneNumber } = Object.fromEntries(formData)
        const id = session.user.id;
        const email = session.user.email;
        const [classTablePath, transcriptPath, picturePath, bookBankPath] = await Promise.all([
            fileUploadHandler(formData.get("UserDocument[transcriptPath]"), email, "ทรานสคริป"),
            fileUploadHandler(formData.get("UserDocument[classTablePath]"), email, "ตารางเรียน"),
            fileUploadHandler(formData.get("UserDocument[bookBankPath]"), email, "สำเนาบัญชี"),
            fileUploadHandler(formData.get("UserDocument[picturePath]"), email, "รูปถ่าย")
        ])
        console.log({ classTablePath, transcriptPath, picturePath, bookBankPath })

        /**
         * @remark todo : ทำให้สามารถบันทึกลง DB ได้ และ ทำ Docker volume mount ไว้ที่ /app/public/uploads
         */

        return NextResponse.json({ message: "I got your message bra!" })
    } catch (error) {
        // หากเกิด error ให้ทำการตรวจสอบ error และตอบกลับ
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}