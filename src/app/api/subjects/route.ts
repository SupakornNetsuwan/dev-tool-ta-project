import createCourse from "./func/createCourse";
import getAllCourses from "./func/getAllCourses";
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

/**
 * @description สำหรับการร้องขอข้อมูลรายวิชาทั้งหมด
 */

export const GET = async (request: NextRequest) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const courses = await getAllCourses()
        return NextResponse.json({ message: "ร้องขอข้อมูลทุกวิชาสำเร็จ", data: courses })
    } catch (error) {
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}

/**
 * @description สำหรับการสร้างราวิชาใหม่
 */
export const POST = async (request: NextRequest) => {
    // ตรวจสอบสิทธิ์
    const { hasPermission, session } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const body = await request.json();
        const update = await createCourse(body)
        return NextResponse.json({ message: "ทำการเพิ่มข้อมูลสำเร็จ", data: update })
    } catch (error) {
        console.log(error);
        
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