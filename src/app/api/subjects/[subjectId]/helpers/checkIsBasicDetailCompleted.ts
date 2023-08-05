import { Prisma } from "@prisma/client";
import { ZodError, z } from "zod"

export const basicDetailSchema = z.object({
    title: z.string().nonempty({ message: "ขาดคำนำหน้า" }),
    firstname: z.string().nonempty({ message: "ขาดชื่อจริงของผู้สอน" }),
    lastname: z.string().nonempty({ message: "ขาดนามสกุลของผู้สอน" }),
    contact: z.string().nonempty({ message: "ขาดช่องทางการติดต่อ" }),
    enrollCondition: z.string().nullish(),
    secretCode: z.string().nullish(),
});

const checkIsBasicDetailCompleted = (course: Prisma.CourseCreateManyInput) => {
    let isBasicDetailCompleted = false;
    try {
        console.log(`กำลังตรวจสอบความครบถ้วนของข้อมูลพื้นฐานวิชา ${course.subjectId}...`);
        basicDetailSchema.parse({
            contact: course.contact,
            enrollCondition: course.enrollCondition,
            firstname: course.firstname,
            lastname: course.lastname,
            title: course.title,
            secretCode: course.secretCode,
        });
        console.log("ข้อมูลของคอร์ส ครบถ้วน ✅");
        isBasicDetailCompleted = true;
    } catch (error) {
        if (!(error instanceof ZodError)) throw error // ถ้าไม่ใช้ปัญหาที่เกิดจาก zod ให้ throw error ออกไป
        console.log(error.issues.map((issue) => issue.message).join(" . "));
        console.log("ข้อมูลของคอร์สไม่ครบถ้วน แต่ไม่เป็นไร ได้กำหนดสถานะเข้าตัวแปรแล้ว ❌");
    }
    
    return isBasicDetailCompleted
}

export default checkIsBasicDetailCompleted