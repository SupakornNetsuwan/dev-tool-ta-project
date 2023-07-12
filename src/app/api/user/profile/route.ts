import { NextRequest, NextResponse } from "next/server"
import checkAuth from "@/core/func/checkAuth"
import getProfile from "./func/getProfile"
// Form upload handling
import fileUploadHandler from "@/core/func/fileUploadHandler"
import checkRemoveOldFiles from "./func/checkRemoveOldFiles"
import updateProfile from "./func/updateProfile"

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

export const PATCH = async (request: NextRequest) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "PROFESSOR", "STUDENT", "SUPERADMIN"])
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const formData = await request.formData();
        const { firstname, lastname, title, address, phoneNumber } = (Object.fromEntries(formData)) as { [key: string]: string | null }
        const id = session.user.id; // เราไม่เชื่อในสิ่งที่ User ส่งมา จึงเช็คจาก session
        const email = session.user.email; // เราไม่เชื่อในสิ่งที่ User ส่งมา จึงเช็คจาก session
        const [bookBankPath, classTablePath, transcriptPath, picturePath] = await Promise.all([
            fileUploadHandler(formData.get("UserDocument[bookBankPath]"), email, "สำเนาบัญชี"),
            fileUploadHandler(formData.get("UserDocument[classTablePath]"), email, "ตารางเรียน"),
            fileUploadHandler(formData.get("UserDocument[transcriptPath]"), email, "ทรานสคริป"),
            fileUploadHandler(formData.get("UserDocument[picturePath]"), email, "รูปถ่าย")
        ])

        await checkRemoveOldFiles({ bookBankPath, classTablePath, picturePath, transcriptPath }, id)

        const updatedProfile = await updateProfile({
            title, firstname, lastname, address, phoneNumber, email, id, UserDocument: {
                classTablePath, transcriptPath, picturePath, bookBankPath
            }
        });

        return NextResponse.json({ message: "ทำการอัปเดตข้อมูลเรียบร้อย", data: updatedProfile })
    } catch (error) {
        // หากเกิด error ให้ทำการตรวจสอบ error และตอบกลับ
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}