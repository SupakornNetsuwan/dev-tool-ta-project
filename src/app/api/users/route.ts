import checkAuth from "@/core/func/checkAuth"
import { NextRequest, NextResponse } from "next/server"
import getUsers from "./func/getUsers"
import { Role } from "@prisma/client"

/**
 * @description ทำการดึงข้อมูลผู้ใช้งานทั้งหมด
 */

export const GET = async (request: NextRequest) => {
    const url = new URL(request.url)
    const role = url.searchParams.get("role") // ถ้าหากมีการแนบ role ที่ต้องการค้นหามาด้วยใน Query parameter

    const { hasPermission, session } = await checkAuth(["ADMIN", "SUPERADMIN"])
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        if (!role) {
            const users = await getUsers()
            return NextResponse.json({ message: "รายชื่อผู้ใช้งานทั้งหมด", data: users })
        }

        if (role) {
            const usersByRole = await getUsers(role.toLocaleUpperCase() as Role)
            return NextResponse.json({ message: `รายชื่อผู้ใช้งานทั้งหมดที่มี role เป็น ${role}`, data: usersByRole })
        }

    } catch (error) {
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}