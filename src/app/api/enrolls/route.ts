import { NextResponse, NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {

    return NextResponse.json({ message: "/api/enrolls is working properly 🟢" })
}