import { Prisma } from "@prisma/client";
import { prisma } from "../../../../../core/libs/prisma/connector"
import type { Courses} from '@prisma/client'

// buinessProblem of this is  ผู้ใช้อัพโหลด csv ไม่ตรงตามไทป์ที่เราอนุญาต, ผู้ใช้อัพโหลดข้อมูลผิด ไม่ตรง format 

//ensures type safety
type Course = Prisma.CoursesCreateInput;
// function to recive array of Course object  return promise Courses object
type ArrayCourse= (courses: Course[]) => Promise<Courses[]>;

const updateCourse:ArrayCourse = async (courses: Course[]) =>{
    console.log("กำลังบันทึกวิชาที่เปิดรับสมัคร......")
        try {
            const createdCourses: Courses[] = await Promise.all(
              courses.map((course) =>
                prisma.courses.create({
                  data: course,
                })
              )
            );
        return createdCourses;
    }catch(error){
        // instanceof Error จะเป็น error ที่เกี่ยวข้องกับ user ในการเก็บข้อมูลลง prisma เช่น ข้อมูลที่เก็บ อาจจะไม่ตรง type หรือมีข้อมูลซ้ำ
        if (error instanceof Error) throw error
        if (typeof error === "string") throw new Error(error.toString())
        if (error instanceof Object) throw new Error(JSON.stringify(error))
        throw new Error("Unknown error while saving course")
    }
}
export default updateCourse
