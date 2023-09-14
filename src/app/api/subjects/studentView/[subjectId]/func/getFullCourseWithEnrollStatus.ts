import { prisma } from "@/core/libs/prisma/connector"
import exclude from "@/core/func/exclude"
import { GetFullCourseWithEnrollStatusType } from "../FullCourseWithEnrollStatusType"
import type { SystemStatusResponseType } from "@/app/api/systemStatus/SystemStatusType"
import getSystemStatus from "@/app/api/systemStatus/func/getSystemStatus"
import dayjs from "dayjs"

// ฟังก์ชันเพื่อระบุสถานะว่านักศึกษาผ่านการคัดเลือกหรือไม่
const formatEnrollStatus = (enrollStatus: GetFullCourseWithEnrollStatusType["Enroll"][number]["enrollStatus"], systemStatus: SystemStatusResponseType): GetFullCourseWithEnrollStatusType["Enroll"][number]["formatEnrollStatus"] => {
    switch (enrollStatus) {
        case "PENDING":
            // ถ้าระบบเปิดรับสมัครอยู่ แล้ว เป็น PENDING แสดงว่ากำลังรอการคัดเลือก แต่ถ้าระบบปิดแล้วขึ้น PENDING ก็คือเค้าไม่ได้ผ่านการคัดเลือก
            return systemStatus?.isOpen ? "รอการคัดเลือก" : "ไม่ผ่านการคัดเลือก"
        case "APPROVED":
            // ให้แสดงไปก่อนว่ารอการคัดเลือกเนื่องจากยังไม่ได้รับการคัดเลือกสุดท้ายโดยห้องฟ้า
            return "รอการคัดเลือก"
        case "FINAL_APPROVED":
            return "ผ่านการคัดเลือก"
        default:
            return "ไม่สามารถระบุได้"
    }
}

const getFullCourseWithEnrollStatus = async (userId: string, subjectId: string): Promise<GetFullCourseWithEnrollStatusType> => {
    const systemStatus = await getSystemStatus()
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

    // เอา passcode และ shareWorkloadFile ออกไป
    const excludedResults = exclude(result, ["secretCode", "shareWorkloadFile"])
    // ทำการเช็คว่าวิชานี้ต้องการ secretCode หรือไม่
    const isNeedSecretCode = Boolean(result.secretCode)
    // เช็คว่านักศึกษาคนนี้ได้สมัครไปแล้วหรือยัง
    const enrolledStatus = Boolean(excludedResults.Enroll.length)

    // ✨ payload ที่จะส่งไปให้ User
    const formatResult = {
        ...excludedResults,
        isEnrolled: enrolledStatus,
        isNeedSecretEnrollCode: isNeedSecretCode,
        Enroll: excludedResults.Enroll.map(enrollment => ({
            ...enrollment,
            formatEnrollStatus: formatEnrollStatus(enrollment.enrollStatus, systemStatus)
        }))
    }

    if (!systemStatus?.isOpen && !formatResult.isEnrolled) {
        // ระบบปิดอยู่ และ นักศึกษาไม่ได้ลงทะเบียน 🟡
        throw new Error(`ระบบได้ปิดรับสมัครแล้ว (${dayjs(systemStatus?.closeDate).format("YYYY/M/D HH:mm")})`)
    }

    // ระบบเปิดอยู่ หรือ ถึงจะปิดก็ได้ลงทะเบียนไว้แล้วเข้ามาดูผลสมัครได้ 🟢
    return formatResult

}

export default getFullCourseWithEnrollStatus