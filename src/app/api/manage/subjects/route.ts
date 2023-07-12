import createCourses from "./func/createCourses";
import getAllCourses from "./func/getAllCourses";
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import { Course, Prisma } from "@prisma/client";

/**
 * @description เป็น API Route สำหรับการสร้างข้อมูลรายวิชา และ ส่งข้อมูลรายวิชา
 */

// ร้องขอข้อมูลรายวิชา
export const GET = async (request: NextRequest) => {
    // ตรวจสอบสิทธิ์
    const { hasPermission, session } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const courses: Course[] = await getAllCourses()
        return NextResponse.json({ message: "ร้องขอข้อมูลทุกวิชาสำเร็จ", data: courses })
    } catch (error) {
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Error handling for prisma CRUD error
                if (error.code === 'P2002') message = "มีรายวิชาที่ถูกสร้างซ้ำกัน"
            } else {
                // Error handling for other errors
                if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
                if (error instanceof Error) message = error.message
                if (typeof error == "string") message = error
            }

            return NextResponse.json({ message }, { status: 400 })
        }
    }


export const POST = async (request: NextRequest) => {
    // ตรวจสอบสิทธิ์
    const { hasPermission, session } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const body = await request.json();
        // Create course
        const update = await createCourses(body)
        return NextResponse.json({ message: "ทำการเพิ่มข้อมูลสำเร็จ", data: update })
    } catch (error) {
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Error handling for prisma CRUD error
            if (error.code === 'P2002') message = "มีรายวิชาที่ถูกสร้างซ้ำกัน"
        } else {

            // Error handling for other errors
            if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
            if (error instanceof Error) message = error.message
            if (typeof error == "string") message = error
        }

        return NextResponse.json({ message }, { status: 400 })
    }
}