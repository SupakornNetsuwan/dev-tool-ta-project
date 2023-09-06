
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
// function
import getCourse from "./func/getCourse";
import updateCourse from "./func/updateCourse";
import deleteCourse from "./func/deleteCourse";
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
    console.log(`---------- ทำการดึงข้อมูลคอร์ส : ${subjectId} 📖----------`)
    isGetApprovalData && console.log("- มีการขอข้อมูลฟอร์มอนุมัติด้วย ✨")

    try {

        const course = await getCourse(subjectId, {
            ...(isGetApprovalData && {
                PracticeForm: true,
                TheoryForm: true,
                ProjectBaseForm: true,
            })
        })

        console.log(`ทำการดึงข้อมูลคอร์ส ${subjectId} สำเร็จ ✅`);
        return NextResponse.json({ message: "ร้องขอข้อมูลรายวิชาสำเร็จ", data: course })

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

    const payload: UpdateCourseType = await request.json()

    console.log(`---------- ผู้ใช้ต้องการแก้ไขข้อมูลคอร์ส : ${subjectId} ⚒️ ----------`)
    console.log(`- ข้อมูลที่ได้รับ ${JSON.stringify(payload)}`)

    try {
        const updateCourseResult = await updateCourse(payload, subjectId)
        console.log(`ทำการแก้ไขข้อมูลคอร์ส ${subjectId} สำเร็จ ✅`)
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

/**
 * @description สำหรับการลบวิชา [subjectId]
 */

export const DELETE = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    console.log(`---------- แอดมินต้องการลบข้อมูลคอร์ส : ${subjectId} 🗑️----------`)

    try {
        const deleteCourseResult = await deleteCourse(subjectId)
        console.log(`ทำการลบข้อมูลคอร์ส ${subjectId} สำเร็จ ✅`)
        return NextResponse.json({ message: "ลบข้อมูลวิชาสำเร็จ", data: deleteCourseResult })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}