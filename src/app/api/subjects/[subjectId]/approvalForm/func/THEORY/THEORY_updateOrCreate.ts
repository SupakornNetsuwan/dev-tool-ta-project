import { prisma } from "@/core/libs/prisma/connector"
import { ZodError } from "zod"
import type { ApprovalFormPayloadType } from "../types"
import { THEORY_formSchema } from "./THEORY_formSchema"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import authOptions from "@/core/auth/nextAuth/authOptions"

const updateOrCreate = async (subjectId: string, payload: ApprovalFormPayloadType) => {
    const user = await getServerSession(authOptions)

    try {
        const parsedPayload = THEORY_formSchema.parse(payload) // สิ่งที่ได้มาจาก Form ของผู้ใช้ จะถูก validate ก่อนที่จะไปใช้งานต่อ ถ้าผ่านแสดงว่าถูกต้อง ✨
        const data = parsedPayload.TaForms
        console.log("ผู้ใช้ต้องการสร้าง หรือ อัปเดตฟอร์มประเภท THEORY 📃");

        const targetCourse = await prisma.course.findUnique({
            where: {
                subjectId
            },
            select: {
                TheoryForm: true,
                professorId: true
            },
        })

        // เช็คว่าเป็นเจ้าของหรือไม่
        if (user?.user.role === "PROFESSOR") {
            if (targetCourse?.professorId != user.user.id) {
                throw new Error("คุณไม่มีสิทธิ์แก้ไข หรือ อัปเดตข้อมูล")
            }
        }

        if (data.length == 0) throw new Error("โปรดระบุกลุ่มการสอนมากกว่าหรือเท่ากับ 1 กลุ่ม")

        // เช็คว่ามี groupNumber ซ้ำมั้ย
        if (new Set(data.map(ta => ta.groupNumber)).size !== data.length) {
            throw new Error("มีหมายเลขกลุ่มที่ซ้ำกัน")
        }


        // ข้อมูลที่ต้องลบออกหาได้จากการเปรียบเทียบกับข้อมูลเก่า
        const dataToDelete = targetCourse?.TheoryForm.filter((oldData) => {
            return !data.some((newData) => oldData.groupNumber == parseInt(newData.groupNumber))
        })

        return await prisma.$transaction(async () => {

            // ทำการลบข้อมูลที่ผู้ใช้ต้องการลบออก ซึ่งเราใช้ข้อมูลที่ได้มาจากการเปรียบเทียบกับข้อมูลเก่า
            dataToDelete?.length && await prisma.theoryForm.deleteMany({
                where: {
                    subjectId: subjectId,
                    groupNumber: {
                        in: dataToDelete?.map((data) => data.groupNumber)
                    }
                }
            })

            await prisma.$transaction(
                [...data.map(ta => {
                    return prisma.theoryForm.upsert({
                        where: {
                            subjectId_groupNumber: {
                                groupNumber: parseInt(ta.groupNumber),
                                subjectId: subjectId
                            }
                        },
                        create: {
                            groupNumber: parseInt(ta.groupNumber),
                            subjectId: ta.subjectId,
                            studentAmount: parseInt(ta.studentAmount),
                            otherTaTeachDay: ta.otherTaTeachDay,
                            otherTaWorkDay: ta.otherTaWorkDay
                        },
                        update: {
                            groupNumber: parseInt(ta.groupNumber),
                            subjectId: ta.subjectId,
                            studentAmount: parseInt(ta.studentAmount),
                            otherTaTeachDay: ta.otherTaTeachDay,
                            otherTaWorkDay: ta.otherTaWorkDay
                        }
                    })
                }),
                prisma.course.update({
                    where: { subjectId },
                    data: { approvalForm: "THEORY" }
                })
                ])
        })

    } catch (error) {
        console.log(error, "เกิดปัญหาในการแก้ไข THEORY 😭")
        if (error instanceof ZodError) console.log(error.issues.map((issue) => issue.message).join(" . "));

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code == "P2025") {
                console.log("- ไม่พบวิชาที่ต้องการอัปเดต");
            }
        }

        throw error
    }
}

export default updateOrCreate
