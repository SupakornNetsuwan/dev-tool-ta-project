
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import { Course, Prisma } from "@prisma/client";
// function
import getCourse from "./func/getCourse";
import updateCourse from "./func/updateCourse";
import type { UpdateCourseType } from "./CourseTypes";

type ParamsType = {
    params: {
        subjectId: string
    }
}

/**
 * @description สำหรับการร้องขอข้อมูลรายวิชา [subjectId] และ สามารถร้องขอข้อมูลฟอร์มอนุมัติผู้ช่วยสอนได้
 * @param isGetApprovalForm ต้องการข้อมูลฟอร์มอนุมัติหรือไม่
 */

export const GET = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN", "STUDENT", "PROFESSOR"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    const url = new URL(request.url)

    const isGetApprovalData = url.searchParams.get("isGetApprovalForm") || false
    console.log(`---------- ทำการดึงขอมูลคอร์ส : ${subjectId} ----------`)
    isGetApprovalData && console.log("- มีการขอข้อมูลฟอร์มอนุมัติด้วย ✨")

    try {
        if (subjectId !== undefined) {
            const course = await getCourse(subjectId, {
                ...(isGetApprovalData && {
                    GTEForm: true,
                    LTForm: true,
                    RefScheduleForm: true,
                    TheoryForm: true,
                    ProjectBaseForm: true,
                    OtherForm: true,
                })
            })

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
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN", "PROFESSOR"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const payload: UpdateCourseType = await request.json()
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