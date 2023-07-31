import { prisma } from "@/core/libs/prisma/connector"
import { getServerSession } from "next-auth"
import authOptions from "@/core/auth/nextAuth/authOptions"

const deleteApprovalForm = async (subjectId: string) => {
    const user = await getServerSession(authOptions)

    try {
        const targetCourse = await prisma.course.findUnique({
            where: { subjectId },
            select: { professorId: true },
        })

        // เช็คว่าเป็นเจ้าของหรือไม่
        if (user?.user.role === "PROFESSOR") {
            if (targetCourse?.professorId != user.user.id) {
                throw new Error("คุณไม่มีสิทธิ์แก้ไข หรือ อัปเดตข้อมูล")
            }
        }


        return await prisma.course.update({
            where: {
                subjectId
            },
            data: {
                approvalForm: null,
                GTEForm: {
                    deleteMany: {
                        subjectId
                    }
                },
                LTForm: {
                    deleteMany: {
                        subjectId
                    }
                },
                RefScheduleForm: {
                    deleteMany: {
                        subjectId
                    }
                },
                TheoryForm: {
                    deleteMany: {
                        subjectId
                    }
                },
                ProjectBaseForm: {
                    deleteMany: {
                        subjectId
                    }
                },
                OtherForm: {
                    deleteMany: {
                        subjectId
                    }
                },
            }
        })
    } catch (error) {
        throw error
    }
}

export default deleteApprovalForm