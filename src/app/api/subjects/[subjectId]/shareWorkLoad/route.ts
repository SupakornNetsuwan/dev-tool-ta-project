import checkAuth from "@/core/func/checkAuth"
import { NextResponse, NextRequest } from "next/server"
import fileUploadHandler from "@/core/func/fileUploadHandler"
import updateWorkLoadFile from "./func/updateWorkLoadFile"


type ParamsType = {
    params: {
        subjectId: string
    }
}

/**
 * 
 * @description ใช้สำหรับการแก้ไขไฟล์ shareWorkloadFile ของวิชานั้นๆ
 */

export const PATCH = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "PROFESSOR", "STUDENT", "SUPERADMIN"])
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const formData = await request.formData()
        const { shareWorkloadFile } = (Object.fromEntries(formData)) as { [key: string]: string | null }
        const shareWorkLoadFilePath = await fileUploadHandler(shareWorkloadFile, `/shareWorkLoad/${subjectId}`, "ไฟล์แบ่งภาระงาน", ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"])

        if (!shareWorkLoadFilePath) throw new Error("ไม่มีไฟล์แบ่งภาระงานถูกส่งมาด้วย")

        const updatedCourse = updateWorkLoadFile(subjectId, shareWorkLoadFilePath)

        return NextResponse.json({ message: "อัปโหลดไฟล์แบ่งภาระงานสำเร็จ", data: updatedCourse })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}