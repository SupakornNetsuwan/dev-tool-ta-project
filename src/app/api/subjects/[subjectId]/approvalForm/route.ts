import checkAuth from "@/core/func/checkAuth"
import { ApprovalFormType } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import updateOrCreateApprovalForm from "./func/updateOrCreateApprovalForm"
import deleteApprovalForm from "./func/deleteApprovalForm"

type ParamsType = {
    params: {
        subjectId: string
    }
}

export const GET = async () => {
    return NextResponse.json({ message: "Hello world!" })
}

/**
 * @description สำหรับการสร้าง หรือ อัปเดตฟอร์มอนุมัติของรายวิชา [subjectId] ถ้าหากยังไม่สร้าง โดยที่จะรองรับทั้ง 6 ฟอร์ม
 * 
 */

export const PUT = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN", "PROFESSOR"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    console.log(`---------- ผู้ใช้ต้องการอัปเดตหรือสร้าง Approval form : ${subjectId} ----------`)

    try {
        const payload = await request.json() // ประเภทของฟอร์มที่จะสร้าง หรือ อัปเดต
        const updateApprovalFormResult = await updateOrCreateApprovalForm(subjectId, payload)
        console.log(`ทำการอัปเดตหรือสร้าง Approval form วิชา ${subjectId} สำเร็จ 🎉`)
        return NextResponse.json({ message: `ทำการอัปเดตวิชา ${subjectId} สำเร็จ`, data: updateApprovalFormResult })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}

export const DELETE = async (request: NextRequest, { params: { subjectId } }: ParamsType) => {
    const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN", "PROFESSOR"]);
    if (!hasPermission) return NextResponse.json({ message: "คุณไม่มีสิทธิ์เข้าถึงข้อมูล 🥹" }, { status: 403 })
    console.log(`---------- ผู้ใช้ต้องการลบ Approval form : ${subjectId} ----------`)

    try {
        await deleteApprovalForm(subjectId)
        console.log(`ทำการลบ Approval form วิชา ${subjectId} สำเร็จ 🎉`)
        return NextResponse.json({ message: "ทำการลบฟอร์มขออนุมัติผู้ช่วยสอนสำเร็จ" })
    } catch (error) {
        console.log(error);
        let message = "เกิดปัญหาที่ไม่ทราบสาเหตุ"
        if (error instanceof Object && !(error instanceof Error)) message = JSON.stringify(error);
        if (error instanceof Error) message = error.message
        if (typeof error == "string") message = error
        return NextResponse.json({ message }, { status: 400 })
    }
}