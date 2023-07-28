import { prisma } from "@/core/libs/prisma/connector";
import { Prisma, type Course } from "@prisma/client";
import type { FetchCourseType } from "../CourseTypes";
import { schema } from "./getCourse";
import { ZodError } from "zod";

const updateCourse = async (payload: Prisma.CourseUpdateInput, subjectId: string): Promise<FetchCourseType> => {
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
    }
    console.log("ข้อมูลของคอร์ส ไม่ครบถ้วน ❌");
  }

  return { ...response, isBasicDetailCompleted };
};

export default updateCourse;
