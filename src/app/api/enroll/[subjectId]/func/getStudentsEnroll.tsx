import { prisma } from "@/core/libs/prisma/connector";
import type { ResponseGetEnrollType } from "../EnrollType";

const getStudentsEnroll = async (subjectId: string):Promise<ResponseGetEnrollType> =>{
    const Enroll = await prisma.enroll.findMany({
        where:{
            course:{
                subjectId : subjectId
            }
        },
        select:{
            enrollStatus : true,
            enrollId: true,
            student:{
                select:{
                    id:true,
                    fullname:true,
                }
            },
            course:{
                select:{
                    subjectId:true,
                    nameEng:true
                }
            }
        }
    })
    return Enroll
}
export default getStudentsEnroll