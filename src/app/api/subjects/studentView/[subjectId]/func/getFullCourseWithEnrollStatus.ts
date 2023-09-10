import { prisma } from "@/core/libs/prisma/connector"
import exclude from "@/core/func/exclude"
import { GetFullCourseWithEnrollStatusType } from "../FullCourseWithEnrollStatusType"

const getFullCourseWithEnrollStatus = async (userId: string, subjectId: string): Promise<GetFullCourseWithEnrollStatusType> => {
    const result = await prisma.course.findUniqueOrThrow({
        where: {
            subjectId
        },
        include: {
            Enroll: {
                where: {
                    studentId: {
                        equals: userId
                    },
                },
                select: {
                    studentId: true,
                    enrollStatus: true,
                    enrollDate: true,
                }
            },

        }
    })

    // ทำการเช็คว่าวิชานี้ต้องการ secretCode หรือไม่
    const isNeedSecretCode = Boolean(result.secretCode)
    // เอา passcode และ shareWorkloadFile ออกไป
    const excludedResults = exclude(result, ["secretCode", "shareWorkloadFile"])
    return { ...excludedResults, status: excludedResults.Enroll.length > 0 ? "enrolled" : "unenrolled", isNeedSecretCode }
}

export default getFullCourseWithEnrollStatus