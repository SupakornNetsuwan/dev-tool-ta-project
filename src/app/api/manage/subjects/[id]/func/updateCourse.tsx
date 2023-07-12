
import { prisma } from "@/core/libs/prisma/connector"
// type
import type { Course } from "@prisma/client";
import type { ResponseGetCoursesType } from "../CourseType";
// body contains subset of Course(subjectId)
const updateCourse = async (body:Partial<Course>) : Promise<ResponseGetCoursesType[number]>=>{
    const response = await prisma.course.update({
        where : {subjectId : body.subjectId},
        data : body,
        select :{
            subjectId : true,
            nameEng : true,
            professor: true
        }
    })
    return response
}

export default updateCourse