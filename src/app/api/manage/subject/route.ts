import { NextApiRequest, NextApiResponse } from "next";
import updateCourse from "@/app/api/manage/subject/func/StoreCourse";
import checkAuth from "@/core/func/checkAuth";
import { NextRequest, NextResponse } from "next/server";
import getAllCourse from "./func/getAllCourse";
import { Courses } from "@prisma/client";
/**
 * @description เป็น API Route สำหรับการสร้างข้อมูลรายวิชา และ ส่งข้อมูลรายวิชา
 */

// ร้องขอข้อมูลรายวิชา
export async function GET(req:NextRequest, res:NextResponse) {
    // ตรวจสอบสิทธิ์
    const { session, hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if(!hasPermission)  {
        console.log("มีผู้ใข้งานไม่สิทธจะอัพโหลดรายวิชา")
        return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    }
    try{
        const Course:Courses[] = await getAllCourse()
        return NextResponse.json({message: "คุณได้รับข้อมูลรายวิชา", data: Course})
    }catch(error){
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error)
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
    
    
}

export async function POST(req:NextRequest) {
    // ตรวจสอบสิทธิ์
    const { session, hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN"]);
    if(!hasPermission)  {
        console.log("มีผู้ใข้งานไม่สิทธจะอัพโหลดรายวิชา")
        return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    }
    try{
        const data = await req.json();
        // update course
        const update = await updateCourse(data)
        return new Response(JSON.stringify(update))
    }catch(err){
        console.log(err)
        if(err instanceof  Error){
            // business error = error เวลาที่ผู้ใช้อัพโหลดรายวิชา
            return  NextResponse.json({ message:"ไฟล์ที่อัพโหลดไม่ถูกต้อง หรือ มีวิชานี้อยู่ในฐานข้อมูล" }, { status: 400 })
        }else{
            return  NextResponse.json({ message:"เกิดปัญหาที่ไม่สามารถแก้ไขได้" }, { status: 500 })
        }
    }
}