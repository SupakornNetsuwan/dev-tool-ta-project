
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
    params: {
        subjectId: string
    }
}

export const GET = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN", "STUDENT"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        if (subjectId !== undefined) {
            
            return NextResponse.json({ message: "ร้องขอข้อมูลรายวิชาสำเร็จ", data: "data"})
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