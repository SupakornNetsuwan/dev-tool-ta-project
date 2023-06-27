import createCourses from "./func/createCourses";
import getAllCourses from "./func/getAllCourses";
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import { Course } from "@prisma/client";

/**
 * @description เป็น API Route สำหรับการสร้างข้อมูลรายวิชา และ ส่งข้อมูลรายวิชา
 */

// ร้องขอข้อมูลรายวิชา
export const GET = async (request: NextRequest) => {
    // ตรวจสอบสิทธิ์
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const courses: Course[] = await getAllCourses()
        return NextResponse.json({ message: "ร้องขอข้อมูลทุกวิชาสำเร็จ", data: courses })
    } catch (error) {
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}

export const POST = async (request: NextRequest) => {
    // ตรวจสอบสิทธิ์
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const body = await request.json();
        // update course
        const update = await createCourses(body)
        return NextResponse.json({ message: "ทำการเพิ่มข้อมูลสำเร็จ", data: update })
    } catch (err) {
        console.log(err)
        if (err instanceof Error) {
            // business error = error เวลาที่ผู้ใช้อัพโหลดรายวิชา
            return NextResponse.json({ message: "ไฟล์ที่อัพโหลดไม่ถูกต้อง หรือ มีวิชานี้อยู่ในฐานข้อมูล" }, { status: 400 })
        } else {
            return NextResponse.json({ message: "เกิดปัญหาที่ไม่สามารถแก้ไขได้" }, { status: 500 })
        }
    }
}