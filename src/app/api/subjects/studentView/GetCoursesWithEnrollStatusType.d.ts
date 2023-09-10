import { Prisma } from "@prisma/client"

/**
 * @description ไว้เป็น type สำหรับนำไปใช้ในกรณีที่นักศึกษาต้องการดึงคอร์สทั้งหมดที่เขาสามารถลงทะเบียนได้ หรือ เขาลงไปแล้วก็จะมีสถานะที่แตกต่างกันไป ทำให้สามารถนำไปแสดงผลได้ง่ายมากขึ้น (ทำหน้าที่ map)
 */

export type GetCoursesWithEnrollStatusType = (Omit<Prisma.CourseGetPayload<{
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
}>, "secretCode" | "shareWorkloadFile"> & {
    status: "enrolled" | "unenrolled"
})[]