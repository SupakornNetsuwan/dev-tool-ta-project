import { prisma } from "@/core/libs/prisma/connector"
import type { FetchCourseType } from "../CourseTypes";
import checkIsBasicDetailCompleted from "../helpers/checkIsBasicDetailCompleted";

const deleteCourse = async (subjectId: string): Promise<FetchCourseType> => {
    const deletedCourse = await prisma.course.delete({
        where: {
            subjectId: subjectId
        },
        include: {
            professor: true,
        },
    })

    // ตรวจสอบความครบถ้วนของข้อมูล
    const isBasicDetailCompleted = checkIsBasicDetailCompleted(deletedCourse)

    return { ...deletedCourse, isBasicDetailCompleted };
}

export default deleteCourse