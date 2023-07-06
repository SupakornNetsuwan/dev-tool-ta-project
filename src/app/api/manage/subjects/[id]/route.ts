
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import { Course, Prisma } from "@prisma/client";
// function
import getCourse from "./func/getCourse";
import updateCourse from "./func/updateCourse";

export const GET = async (request:NextRequest) =>{
    const url = request.url
    const encodeParams = url.split("/").pop()
    // ตรวจสอบสิทธ์
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN","STUDENT"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    try{
        if(encodeParams !== undefined){
        const queryParams = decodeURIComponent(encodeParams).replaceAll("-"," ")
        const corseDetails = await getCourse(queryParams)
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


export const PATCH = async (request:NextRequest) => {
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })

    try{
        // แนบ รหัสวิชามาด้วยต้อง 
        const body: Partial<Course> = await request.json()
        if(!body.subjectId) throw new Error("โปรดแนบข้อมูลรหัสวิชาที่จะแก้ไขมาด้วย")
        const updateCourseResult = await updateCourse(body)
        return NextResponse.json({ message: "ทำการอัพเดทข้อมูลรายวิชาสำเร็จ", data: updateCourseResult })
    }catch(error){
        console.log(error)
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}