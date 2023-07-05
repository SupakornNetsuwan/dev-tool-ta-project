
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import { Course, Prisma } from "@prisma/client";
import getCourse from "./func/getCourse";
import { parse } from "path";
export const GET = async (request:NextRequest) =>{
    const url = request.url
    const encodeParams = url.split("/").pop()
    // ตรวจสอบสิทธ์
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN","STUDENT"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    try{
        if(encodeParams !== undefined){
        const queryParams = decodeURIComponent(encodeParams).replaceAll("-"," ")
        console.log(queryParams)
        const corseDetails = await getCourse(queryParams)
        console.log(corseDetails)
        return NextResponse.json({ message: "ร้องขอข้อมูลรายวิชาสำเร็จ", data: corseDetails })
        }
    }catch(error){
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Error handling for prisma CRUD error
                if (error.code === 'P2002') message = "มีรายวิชาที่ถูกสร้างซ้ำกัน"
            } else {
                // Error handling for other errors
                if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
                if (error instanceof Error) message = error.message
                if (typeof error == "string") message = error
            }

            return NextResponse.json({ message }, { status: 400 })
        }
}
