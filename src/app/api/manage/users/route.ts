import { NextRequest, NextResponse } from "next/server"
import type { User } from "@prisma/client"
import checkAuth from "@/core/func/checkAuth"
import updateUser from "./func/updateUser"
import getUsers from "./func/getUsers"

export const PATCH = async (request: NextRequest) => {
    const { hasPermission } = await checkAuth(["ADMIN"])
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const body: Partial<User> = await request.json()
        if (!body.id) throw new Error("โปรดแนบข้อมูล ID ผู้ใช้ที่จะแก้ไขมาด้วย")
        const updateResult = await updateUser(body)
        return NextResponse.json({ message: "ทำการแก้ไขข้อมูลผู้ใช้สำเร็จ", data: updateResult })
    } catch (error) {
        let message = ""
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}

export const GET = async (request: NextRequest) => {
    const { hasPermission } = await checkAuth(["ADMIN"])
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const users = await getUsers()
        return NextResponse.json({ message: "รายชื่อผู้ใช้งานทั้งหมด", data: users })
    } catch (error) {
        let message = ""
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }

}