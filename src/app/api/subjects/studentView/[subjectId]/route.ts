import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
    params: {
        subjectId: string
    }
}

export const GET = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "STUDENT", "SUPERADMIN", "PROFESSOR"]);
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    const user = session.user
    // console.log(`------- ทำการดึงข้อมูลการเข้าถึงคอร์สรหัส ${subjectId} ของนักศึกษารหัส ${user.id} 🎓-------`)

    try {
        console.log(subjectId);

        return NextResponse.json({ message: "HELLO", data: subjectId })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}