import { prisma } from "@/core/libs/prisma/connector";
import type { FetchCourseType } from "../CourseTypes";
import { schema } from "./getCourse";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import authOptions from "@/core/auth/nextAuth/authOptions";
import type { UpdateCourseType } from "../CourseTypes";

const updateCourse = async (payload: UpdateCourseType, subjectId: string): Promise<FetchCourseType> => {
  const session = await getServerSession(authOptions);

  const target = await prisma.course.findUnique({
    where: { subjectId: subjectId },
    select: { professorId: true },
  });

  // ตรวจสอบว่าเป็นผู้สร้างคอร์สหรือไม่
  if (session?.user.role === "PROFESSOR") {
    if (target?.professorId !== session?.user.id) {
      throw new Error("คุณไม่มีสิทธิ์ในการแก้ไขคอร์สนี้");
    }
  }

  const response = await prisma.course.update({
    where: {
      subjectId: subjectId,
    },
    data: payload,
    include: {
      professor: true,
    },
  });

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
      throw error
    }
  }
  return { ...response, isBasicDetailCompleted };
};

export default updateCourse;
