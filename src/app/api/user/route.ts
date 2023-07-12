import checkAuth from "@/core/func/checkAuth"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    const { hasPermission, session } = await checkAuth(["ADMIN", "PROFESSOR", "STUDENT", "SUPERADMIN"])
    return NextResponse.json({ message: "Hello World" })
}