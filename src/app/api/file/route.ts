import checkAuth from "@/core/func/checkAuth";
import { prisma } from "@/core/libs/prisma/connector";
import { NextRequest, NextResponse } from "next/server";
import { basename, join, extname } from "path";
import fs from "fs/promises";
import mime from "mime";

export const GET = async (request: NextRequest) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "PROFESSOR", "SUPERADMIN", "STUDENT"])
    if (!session) return NextResponse.json({ message: "โปรดเข้าสู่ระบบ" }, { status: 401 })
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try {
        const url = new URL(request.url)
        const filePath = url.searchParams.get("path")
        if (!filePath) throw new Error("โปรดแนบ path ของไฟล์")
        const absoluteFilePath = join(process.cwd(), "public", filePath)
        // ...
        const file = await fs.readFile(absoluteFilePath)
        const fileType = mime.getType(absoluteFilePath)
        const formatedFilename = basename(absoluteFilePath).split("-").slice(0, -2).join("-") + extname(basename(absoluteFilePath))
        console.log(`ทำการส่งไฟล์ ${formatedFilename} กลับ...`)

        return new Response(file, {
            headers: {
                "Content-Type": fileType as string,
                "Content-Disposition": `inline; filename=${encodeURIComponent(formatedFilename)}`
            }
        })
    } catch (error) {
        // หากเกิด error ให้ทำการตรวจสอบ error และตอบกลับ
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}