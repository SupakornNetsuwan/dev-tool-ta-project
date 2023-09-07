import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import getCoursesWithEnrollStatus from "./func/getCoursesWithEnrollStatus";
import getSystemStatus from "../../systemStatus/func/getSystemStatus";

export const GET = async (request: NextRequest) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "STUDENT", "SUPERADMIN", "PROFESSOR"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    console.log(`------- ทำการดึงข้อมูลการเข้าถึงคอร์สที่นักศึกษา ${session.user.id} -------`)
    const user = session.user

    try {
        const [userCourses, systemStatus] = await Promise.all([getCoursesWithEnrollStatus(user.id), getSystemStatus()])

        // if (systemStatus?.isOpen) {

        // }

        return NextResponse.json({ message: `ร้องขอรายวิชาสำหรับ ${user.fullname} (${user.email}) สำเร็จ`, data: userCourses })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}