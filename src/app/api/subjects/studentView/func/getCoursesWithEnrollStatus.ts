import { prisma } from "@/core/libs/prisma/connector"
import exclude from "@/core/func/exclude"
import { GetCoursesWithEnrollStatus } from "../GetStudentCourseType"

/**
 * 
 * @param userId - เป็น ID ของ user ที่ต้องการนำมาตรวจสอบเพื่อดึงข้อมูลคอร์สที่เกี่ยวข้องกับผู้ใช้ดังกล่าว
 * @description หาคอร์สที่เกี่ยวข้องกับผู้ใช้ที่ได้ให้มาเช่น ผู้ใช้ A ต้องการเห็นมุมมองคอร์สของเขา เขาก็จะเห็นคอร์สทั้งหมด ส่วนคอร์สไหนที่สามารถลงทะเบียนได้ก็จะมีการทำเป็น status ถ้าหากว่ามีการลงทะเบียนไปแล้วก็จะมี status ที่แตกต่างไป
 */

const getCoursesWithEnrollStatus = async (userId: string): Promise<GetCoursesWithEnrollStatus> => {
    const results = await prisma.course.findMany({
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
                    enrollDate: true
                }
            }
        },
    })

    // เอา passcode และ shareWorkloadFile ออกไป
    return results.map(result => {
        result = { ...result }
        return exclude(result, ["secretCode", "shareWorkloadFile"])
    })
}


export default getCoursesWithEnrollStatus