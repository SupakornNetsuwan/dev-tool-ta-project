
import { prisma } from "@/core/libs/prisma/connector";
const getCourse = async (queryParams: string)=>{
    const course = await prisma.course.findFirst({
        where: {
            nameEng : queryParams}
    })
    return course
}
export default getCourse