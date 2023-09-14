import schema from '../enrollCourse_formSchema'
import { z } from 'zod'
import { prisma } from '@/core/libs/prisma/connector'


const checkPassword = async (corsePassword: string | null | undefined, userPassword: string | undefined) => {
    console.log(corsePassword)
    if (!corsePassword) return
    if (corsePassword != userPassword) throw new Error("รหัสผ่านสมัครคอร์สไม่ถูกต้อง")
}

const enrollCourse = async (subjectId: string, userId: string, payload: z.infer<typeof schema>) => {
    console.log("ข้อมูล 📃", payload)

    return await prisma.$transaction(async tsx => {

        const enrolledCourse = await tsx.enroll.findUnique({
            where: {
                courseId_studentId: {
                    courseId: subjectId,
                    studentId: userId
                }
            },
            include: {
                course: {
                    select: {
                        secretCode: true
                    }
                }
            }
        })

        // ⚠️
        if (Boolean(enrolledCourse)) throw new Error("คุณได้สมัครคอร์สนี้ไปแล้ว")

        const targetCourse = await tsx.course.findUniqueOrThrow({
            where: {
                subjectId
            },
            select: {
                secretCode: true
            }
        })

        // ⚠️
        if (Boolean(targetCourse.secretCode) && targetCourse.secretCode !== payload.secretCode) throw new Error("รหัสผ่านสมัครคอร์สไม่ถูกต้อง")


        const enrolledResullt = await prisma.enroll.create({
            data: {
                courseInMajors: payload.courseInMajors,
                passedInMajors: payload.passedInMajors,
                degree: payload.degree,
                enrollStatus: "PENDING",
                grade: payload.grade,
                courseId: subjectId,
                studentId: userId,
                passedCourse: payload.passedCourse.map(course => `(${course.subjectId}) ${course.subjectName}`).join(" "),
            }
        })

        return enrolledResullt
    })


}



export default enrollCourse