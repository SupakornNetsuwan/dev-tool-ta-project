import { Prisma } from "@prisma/client"

/**
 * @description ไว้เป็น type สำหรับนำไปใช้ในกรณีที่นักศึกษาต้องการดึงคอร์สในวิชสที่จำเพราะ (กดเข้าไปดูว่า วิชานี้ลงทะเบียนสถานะเป็นเช่นไร)
 */

export type GetFullCourseWithEnrollStatusType = (Omit<Prisma.CourseGetPayload<{
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
}>, "secretCode" | "shareWorkloadFile"> & {
    status: "enrolled" | "unenrolled";
    isNeedSecretCode: boolean
})

/**
 * @description ไว้เป็น type สำหรับนำไปใช้ในกรณีที่นักศึกษาต้องการสมัครผู้ช่วยสอน
 */

export type EnrollCourseType = Omit<Prisma.EnrollUpdateManyMutationInput, "enrollStatus" | "enrollDate"> & Prisma.CourseGetPayload<{ select: { secretCode: true } }>
export type EnrollCourseFormType = Omit<EnrollCourseType, "passedCourse"> & { "passedCourse": { subjectId: string, subjectName: string }[] }