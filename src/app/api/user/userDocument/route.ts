import checkAuth from "@/core/func/checkAuth";
import { prisma } from "@/core/libs/prisma/connector";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "PROFESSOR", "STUDENT", "SUPERADMIN"])
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const userDocument = await prisma.userDocument.findUniqueOrThrow({
            where: {
                userId: session.user.id
            },
            select: {
                bookBankPath: true,
                classTablePath: true,
                picturePath: true,
                transcriptPath: true
            }
        })

        return NextResponse.json({ message: "ร้องขอข้อมูลเอกสารของผู้ใช้สำเร็จ", data: userDocument })
    } catch (error) {
        // หากเกิด error ให้ทำการตรวจสอบ error และตอบกลับ
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}