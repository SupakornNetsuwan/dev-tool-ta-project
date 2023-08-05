import { prisma } from "@/core/libs/prisma/connector"
import { schema } from "./getCourse";
import { ZodError } from "zod";
import type { FetchCourseType } from "../CourseTypes";

const deleteCourse = async (subjectId: string): Promise<FetchCourseType> => {
    console.log(subjectId);

    const response = await prisma.course.delete({
        where: {
            subjectId: subjectId
        },
        include: {
            professor: true,
        },
    })

    let isBasicDetailCompleted = false;

    try {
        console.log("กำลังตรวจสอบความครบถ้วนของข้อมูล...");
        schema.parse({
            contact: response.contact,
            enrollCondition: response.enrollCondition,
            firstname: response.firstname,
            lastname: response.lastname,
            title: response.title,
            secretCode: response.secretCode,
        });
        console.log("ข้อมูลของคอร์ส ครบถ้วน ✅");
        isBasicDetailCompleted = true;
    } catch (error) {
        if (error instanceof ZodError) {
            console.log(error.issues.map((issue) => issue.message).join(" . "));
            console.log("ข้อมูลของคอร์สไม่ครบถ้วน แต่ไม่เป็นไรได้กำหนดสถานะเข้าตัวแปรแล้ว ❌");
        } else {
            throw error;
        }
    }

    return { ...response, isBasicDetailCompleted };
}

export default deleteCourse