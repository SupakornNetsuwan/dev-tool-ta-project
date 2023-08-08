import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import getAllCoursesWithEnroll from "./func/getAllCoursesWithEnroll";

export const GET = async (request: NextRequest) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "STUDENT", "SUPERADMIN", "PROFESSOR"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    console.log(`------- ทำการดึงข้อมูลคอร์สที่นักศึกษาลงทะเบียน -------`)

    try {
        const userId = session.user.id
        const coursesWithEnroll = await getAllCoursesWithEnroll(userId)

    } catch (error) {
        console.log(error);

        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}