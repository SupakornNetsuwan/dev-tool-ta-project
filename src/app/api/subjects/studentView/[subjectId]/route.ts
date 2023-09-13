import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import getFullCourseWithEnrollStatus from "./func/getFullCourseWithEnrollStatus";
import schema from "./enrollCourse_formSchema";
import dayjs from "dayjs";
import { ZodError } from "zod";
import 'dayjs/locale/th'
import enrollCourse from "./func/enrollCourse";
import updateEnrollCourse from "./func/updateEnrollCourse";

dayjs.locale('th')

type ParamsType = {
    params: {
        subjectId: string
    }
}

/**
 * @description ดึงข้อมูลในรายวิชาที่จำเพาะเมื่อนักศึกษาร้องขอเพื่อดูสถานะการสมัครของตัวเอง หรือ รายละเอียดวิชา
 */

export const GET = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "STUDENT", "SUPERADMIN"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    const user = session.user
    console.log(`------- ทำการดึงข้อมูลการเข้าถึงคอร์สรหัส ${subjectId} ของนักศึกษารหัส ${user.id} 🎓-------`)

    try {
        const course = await getFullCourseWithEnrollStatus(user.id, subjectId)
        return NextResponse.json({ message: `ร้องขอรายวิชา ${subjectId} สำหรับ ${user.fullname} (${user.email}) สำเร็จ`, data: course })

    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}

export const POST = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "STUDENT", "SUPERADMIN"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    const user = session.user
    console.log(`------- นักศึกษารหัส ${user.id} ทำการส่งข้อมูลสมัครผู้ช่วยสอนคอร์สรหัส ${subjectId} 🔥-------`)

    try {
        const payload = await request.json()
        const parsePayload = schema.parse(payload)
        const enrollResult = await enrollCourse(subjectId, user.id, parsePayload)
        return NextResponse.json({ message: "ทำการสมัครผู้ช่วยสอนสำเร็จ", data: enrollResult })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        if (error instanceof ZodError) console.log(error.issues.map((issue) => issue.message).join(" . "));
        return NextResponse.json({ message }, { status: 400 })
    }
}

export const PATCH = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "SUPERADMIN", "PROFESSOR"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const payload = await request.json()
        const updateResult = await updateEnrollCourse(payload, subjectId)
        return NextResponse.json({ message: "อัปเดตขอมูลการสมัครสำเร็จ", data: updateResult })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }

}