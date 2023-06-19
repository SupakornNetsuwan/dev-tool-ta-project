import { NextRequest, NextResponse } from "next/server";
import type { SystemStatusPayloadType } from "./SystemStatusType"
// Create function
import createSystemStatus from "./func/createSystemStatus";
// Auth check
import checkAuth from "@/core/func/checkAuth";

/**
 * @description เป็น API Route สำหรับการสร้างข้อมูลระบบสถานะการเปิด-ปิดระบบ
 */

export const POST = async (request: NextRequest) => {
    // ตรวจสอบสิทธิ์
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const body: SystemStatusPayloadType = await request.json()

        // เช็คว่า body มีข้อมูลมาใช่มั้ย
        if (!body.openDate || !body.closeDate) return NextResponse.json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 })
        // ทำการสร้างช่วงเวลาเปิดปิด
        const created = await createSystemStatus(body.openDate, body.closeDate)
        // สำเร็จ
        return NextResponse.json({ message: "กำหนดช่วงเปิดปิดสำเร็จ!", data: created })
    } catch (error) {
        // หากเกิด error ให้ทำการตรวจสอบ error และตอบกลับ
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }

}

export const DELETE = async (request: NextRequest) => {
    // ตรวจสอบสิทธิ์
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    return NextResponse.json({ message: "Hello" }, { status: 200 })
}