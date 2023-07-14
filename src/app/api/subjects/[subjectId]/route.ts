
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import { Course, Prisma } from "@prisma/client";
// function
import getCourse from "./func/getCourse";
import updateCourse from "./func/updateCourse";

type ParamsType = {
    params: {
        subjectId: string
    }
}

/**
 * @description สำหรับการร้องขอข้อมูลรายวิชา [subjectId]
 */

export const GET = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN", "STUDENT"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        if (subjectId !== undefined) {
            const course = await getCourse(subjectId)
            return NextResponse.json({ message: "ร้องขอข้อมูลรายวิชาสำเร็จ", data: course })
        }
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}


/**
 * @description สำหรับการแก้ไขข้อมูลรายวิชา [subjectId]
 */

export const PATCH = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const payload: Partial<Course> = await request.json()
        const updateCourseResult = await updateCourse(payload, subjectId)

        return NextResponse.json({ message: "ทำการอัพเดทข้อมูลรายวิชาสำเร็จ", data: updateCourseResult })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}