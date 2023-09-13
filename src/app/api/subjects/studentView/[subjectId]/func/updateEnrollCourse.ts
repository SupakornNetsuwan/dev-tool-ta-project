import { prisma } from "@/core/libs/prisma/connector"
import { EnrollUpdateType } from "../FullCourseWithEnrollStatusType"

const updateEnrollCourse = async (payload: EnrollUpdateType, subjectId: string) => {
    return await prisma.enroll.update({
        where: {
            courseId_studentId: {
                courseId: subjectId,
                studentId: payload.studentId
            }
        },
        data: { enrollStatus: payload.enrollStatus }
    })

}

export default updateEnrollCourse