import { NextRequest, NextResponse } from "next/server";
import type { SystemStatusPayloadType } from "./SystemStatusType"
import createSystemStatus from "./func/createSystemStatus";
import getSystemStatus from "./func/getSystemStatus";
import deleteSystemStatus from "./func/deleteSystemStatus";
// Auth check
import checkAuth from "@/core/func/checkAuth";
import { ZodError, z } from "zod"

export const GET = async (request: NextRequest) => {
    try {
        const status = await getSystemStatus()
        return NextResponse.json({ message: "ร้องขอข้อมูสถานะการเปิดปิดระบบสำเร็จ", data: status })
    } catch (error) {
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}

/**
 * @description เป็น API Route สำหรับการสร้างข้อมูลระบบสถานะการเปิด-ปิดระบบ
 */

export const POST = async (request: NextRequest) => {
    // ตรวจสอบสิทธิ์
    const { hasPermission, session } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const body: SystemStatusPayloadType = await request.json()

        // เช็คว่า body มีข้อมูลมาใช่มั้ย
        try {
            console.log(body);
            
            const schema = z.object({
                openDate: z.string(),
                closeDate: z.string(),
                semester: z.number({invalid_type_error:"โปรดกรอกภาคการศึกษาเป็นตัวเลข"}),
                year: z.number({invalid_type_error:"โปรดกรอกปีการศึกษา"})
            }).required()
            schema.parse(body)
        } catch (error) {
            if (error instanceof ZodError) {
                return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
            }
        }

        // ทำการสร้างช่วงเวลาเปิดปิด
        const created = await createSystemStatus(body)
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
    const { hasPermission, session } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const deletedSystemStatus = await deleteSystemStatus()
        return NextResponse.json({ message: "ลบข้อมูลสำเร็จ", data: deletedSystemStatus }, { status: 200 })
    } catch (error) {
        let message = "ไม่สามารถลบได้ เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}