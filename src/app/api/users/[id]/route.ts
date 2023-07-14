import checkAuth from "@/core/func/checkAuth"
import { NextRequest, NextResponse } from "next/server"
import type { Role, User } from "@prisma/client"
import updateUser from "./func/updateUser"

/**
 * @description ทำการแก้ไขข้อมูล User ทั่วไป (ไม่รวมถึง Profile และ UserDocument)
 */

export const PATCH = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { hasPermission, session } = await checkAuth(["ADMIN"])
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    const allowedRoles: Role[] = ["ADMIN", "SUPERADMIN"]
    if (!allowedRoles.includes(session.user.role)) {
        // ทำการเช็คว่าถ้าไม่ใช่แอดมิน ก็จะไม่สามารถใช้ user id คนอื่นได้
        if (session.user.id != params.id) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูลของผู้อื่น" }, { status: 403 })
    }

    try {
        const payload: Partial<User> = await request.json()
        const updateResult = await updateUser(payload, params.id)
        return NextResponse.json({ message: "ทำการแก้ไขข้อมูลผู้ใช้สำเร็จ", data: updateResult })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}