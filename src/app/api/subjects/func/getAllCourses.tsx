import { prisma } from "@/core/libs/prisma/connector";
import type { FetchCourseType } from "../[subjectId]/CourseTypes";
import { ZodError } from "zod";
import { schema } from "../[subjectId]/func/getCourse";

const getAllCourse = async (professorId?: string): Promise<FetchCourseType[]> => {
  const courses = await prisma.course.findMany({
    ...(professorId && {
      where: {
        professorId,
      },
    }),
    include: {
      professor: true,
    },
  });

  const coursesWithIsBasicDetailCompleted = courses.map((course) => {
    let isBasicDetailCompleted = false;

    // ทำการเช็คว่า Course's basic detail ครบมั้ย (ควรไปสร้างฟังก์ชันแยก)
    try {
      console.log(`----------\nกำลังตรวจสอบความครบถ้วนของข้อมูล : ${course.subjectId} (${course.nameEng})`);
      schema.parse({
        contact: course.contact,
        enrollCondition: course.enrollCondition,
        firstname: course.firstname,
        lastname: course.lastname,
        title: course.title,
        secretCode: course.secretCode,
      });
      console.log(`ข้อมูลของคอร์ส ${course.subjectId} (${course.nameEng}) ครบถ้วน ✅`);
      isBasicDetailCompleted = true;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.issues.map((issue) => issue.message).join(" . "));
      }
      console.log("ข้อมูลของคอร์ส ไม่ครบถ้วน ❌");
    }

    return { ...course, isBasicDetailCompleted };
  });

  return coursesWithIsBasicDetailCompleted;
};
export default getAllCourse;
