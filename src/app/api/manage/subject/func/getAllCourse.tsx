
import { prisma } from "@/core/libs/prisma/connector";

const getAllCourse = async () =>{
    const courses = prisma.courses.findMany()
    return courses
}
export default getAllCourse