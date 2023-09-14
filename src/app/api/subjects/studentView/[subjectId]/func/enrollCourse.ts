import schema from '../enrollCourse_formSchema'
import { z } from 'zod'
import { prisma } from '@/core/libs/prisma/connector'
import getProfile from '@/app/api/users/[id]/profile/func/getProfile'

const enrollCourse = async (subjectId: string, userId: string, payload: z.infer<typeof schema>) => {
    console.log("ข้อมูล 📃", payload)

    return await prisma.$transaction(async tsx => {

        const profile = await getProfile(userId)

        // ⚠️
        if (!profile?.firstname) throw new Error("โปรดกรอกข้อมูลส่วนตัวที่โปรไฟล์ ให้ครบถ้วน")
        // ⚠️
        if (Object.values(profile?.UserDocument || {}).some(value => !value)) throw new Error("โปรดอัปโหลดเอกสารที่โปรไฟล์ ให้ครบถ้วน")


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
                        secretCode: true,
                        creationStatus: true
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
                secretCode: true,
                creationStatus: true
            }
        })

        // ⚠️
        if (Boolean(targetCourse.secretCode) && targetCourse.secretCode !== payload.secretCode) throw new Error("รหัสผ่านสมัครคอร์สไม่ถูกต้อง")
        // ⚠️
        if (targetCourse?.creationStatus != "ENROLLABLE") throw new Error("ไม่สามารถสมัครได้คอร์ศปิดรับสมัครแล้ว")

        const enrolledResullt = await prisma.enroll.create({
            data: {
                courseInMajors: payload.courseInMajors,
                passedInMajors: payload.passedInMajors,
                degree: payload.degree,
                enrollStatus: "PENDING",
                grade: payload.grade,
                courseId: subjectId,
                studentId: userId,
                passedCourse: payload.passedCourse.map(course => `(${course.subjectId}) ${course.subjectName}`).join(" - "),
            }
        })

        return enrolledResullt
    })


}



export default enrollCourse