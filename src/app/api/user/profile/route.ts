import { NextRequest, NextResponse } from "next/server"
import checkAuth from "@/core/func/checkAuth"
import getProfile from "./func/getProfile"

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
