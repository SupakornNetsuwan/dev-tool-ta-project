import { prisma } from "@/core/libs/prisma/connector";
import type { FetchCourseType, FetchCourseTypeWithApprovementType } from "../CourseTypes";
import { ZodError, z } from "zod";
import { Prisma } from "@prisma/client";

export const schema = z.object({
  title: z.string().nonempty({ message: "ขาดคำนำหน้า" }),
  firstname: z.string().nonempty({ message: "ขาดชื่อจริงของผู้สอน" }),
  lastname: z.string().nonempty({ message: "ขาดนามสกุลของผู้สอน" }),
  contact: z.string().nonempty({ message: "ขาดช่องทางการติดต่อ" }),
  enrollCondition: z.string().nullish(),
  secretCode: z.string().nullish(),
});

const getCourse = async (
  subjectId: string,
  includeOpt: Prisma.CourseInclude = {}
): Promise<FetchCourseType | FetchCourseTypeWithApprovementType> => {
  let isBasicDetailCompleted = false;

  const course = await prisma.course.findFirstOrThrow({
    where: {
      subjectId: subjectId,
    },
    include: {
      ...includeOpt,
      professor: true,
    },
  });

  try {
    console.log("กำลังตรวจสอบความครบถ้วนของข้อมูล...");
    schema.parse({
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
    if (error instanceof ZodError) {
      console.log(error.issues.map((issue) => issue.message).join(" . "));
      console.log("ข้อมูลของคอร์สไม่ครบถ้วน แต่ไม่เป็นไรได้กำหนดสถานะเข้าตัวแปรแล้ว ❌");
    } else {
      throw error
    }
  }

  return { ...course, isBasicDetailCompleted };
};
export default getCourse;
