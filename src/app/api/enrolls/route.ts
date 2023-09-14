
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import { getEnrolls } from "./func/getEnrolls";
import { EnrollStatus } from "@prisma/client";
type ParamsType = {
    params: {
        subjectId: string
    }
}

export const GET = async (request: NextRequest) => {
    console.log("กำลังดึงข้อมูลผู้สมัครทุกวิชา..")
    const { hasPermission } = await checkAuth(["PROFESSOR", "ADMIN", "SUPERADMIN"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const enrollStatus = request.nextUrl.searchParams.get("enrollStatus") as EnrollStatus || false
        const studentsEnroll = await getEnrolls(enrollStatus)
        return NextResponse.json({ message: "ร้องขอข้อมูลผู้สมัครสำเร็จ", data: studentsEnroll })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}
