import { prisma } from "@/core/libs/prisma/connector";
import type { FetchCourseType } from "../CourseTypes";
import { getServerSession } from "next-auth";
import authOptions from "@/core/auth/nextAuth/authOptions";
import type { UpdateCourseType } from "../CourseTypes";
import checkIsBasicDetailCompleted from "../helpers/checkIsBasicDetailCompleted";

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

  const updatedCourse = await prisma.course.update({
    where: {
      subjectId: subjectId,
    },
    data: payload,
    include: {
      professor: true,
    },
  });


  // ตรวจสอบความครบถ้วนของข้อมูล
  const isBasicDetailCompleted = checkIsBasicDetailCompleted(updatedCourse)
  
  return { ...updatedCourse, isBasicDetailCompleted };
};

export default updateCourse;
