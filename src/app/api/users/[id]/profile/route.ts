import { NextRequest, NextResponse } from "next/server"
import checkAuth from "@/core/func/checkAuth"
import getProfile from "./func/getProfile"
// Form upload handling
import fileUploadHandler from "@/core/func/fileUploadHandler"
import checkRemoveOldFiles from "./func/checkRemoveOldFiles"
import updateProfile from "./func/updateProfile"
import type { Role } from "@prisma/client"

type ParamsType = {
    params: {
        id: string
    }
}

/**
 * @description ทำการดึงข้อมูล Profile ของผู้ใช้งานรวมถึง UserDocument ด้วย
 * @route /api/users/[id]/profile
 */

export const GET = async (request: NextRequest, { params }: ParamsType) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "PROFESSOR", "STUDENT", "SUPERADMIN"])
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    const allowedRoles: Role[] = ["ADMIN", "SUPERADMIN"]
    if (!allowedRoles.includes(session.user.role)) {
        // ทำการเช็คว่าถ้าไม่ใช่แอดมิน ก็จะไม่สามารถใช้ user id คนอื่นได้
        if (session.user.id != params.id) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูลของผู้อื่น" }, { status: 403 })
    }

    try {
        const profile = await getProfile(params.id);
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

/**
 * @description ทำการแก้ไข​ Profile ของผู้ใช้งานรวมถึง UserDocument ด้วย
 * @route /api/users/[id]/profile
 */

export const PATCH = async (request: NextRequest, { params }: ParamsType) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "PROFESSOR", "STUDENT", "SUPERADMIN"])
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    if (!["ADMIN", "SUPERADMIN"].includes(session.user.role)) {
        // ทำการเช็คว่าถ้าไม่ใช่แอดมิน ก็จะไม่สามารถใช้ user id คนอื่นได้
        if (session.user.id != params.id) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูลของผู้อื่น" }, { status: 403 })
    }

    try {
        const formData = await request.formData();
        const { firstname, lastname, title, address, email, phoneNumber, bankName, degree, bookBankNumber } = (Object.fromEntries(formData)) as { [key: string]: string | null }
        const id = params.id; // เราไม่เชื่อในสิ่งที่ User ส่งมา จึงเช็คจาก session
        const [bookBankPath, classTablePath, transcriptPath, picturePath] = await Promise.all([
            fileUploadHandler(formData.get("UserDocument[bookBankPath]"), id, "สำเนาบัญชี"),
            fileUploadHandler(formData.get("UserDocument[classTablePath]"), id, "ตารางเรียน"),
            fileUploadHandler(formData.get("UserDocument[transcriptPath]"), id, "ทรานสคริป"),
            fileUploadHandler(formData.get("UserDocument[picturePath]"), id, "รูปถ่าย")
        ])

        await checkRemoveOldFiles({ bookBankPath, classTablePath, picturePath, transcriptPath }, id)

        const updatedProfile = await updateProfile({
            title, firstname, bankName, degree, email, lastname, address, phoneNumber, bookBankNumber, id, UserDocument: {
                classTablePath, transcriptPath, picturePath, bookBankPath
            }
        });

        return NextResponse.json({ message: "ทำการอัปเดตข้อมูลเรียบร้อย", data: updatedProfile })
    } catch (error) {
        console.error(error);

        // หากเกิด error ให้ทำการตรวจสอบ error และตอบกลับ
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}