import { Prisma,User } from "@prisma/client";
//Define a type that only contains a subset of the scalar fields
const GetCoursetype = Prisma.validator<Prisma.CourseArgs>()({
    select :{subjectId:true},
    include:{
        User:{
            select:{
                id:true,
                fullname:true
            }
        } 
    }
})

export type ResponseGetCourseType = Prisma.CourseGetPayload<typeof GetCoursetype>
export type ResponseGetCoursesType = Prisma.CourseGetPayloa<typeof GetCoursetype>[]
