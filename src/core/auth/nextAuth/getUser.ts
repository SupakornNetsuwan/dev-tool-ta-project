import { prisma } from '@/core/libs/prisma/connector'
import type { User } from '@prisma/client'

type GetUserFunctionType = (params: {
    LDAPemail: string,
    LDAPid: string,
    LDAPfullname: string,
    LDAPdepartment: string
}) => Promise<User>

/**
 * @precondition ต้องมีการเรียกข้อมูลผู้ใข้งานจาก LDAP ก่อน
 * @description ทำการค้นหาผู้ใช้งานว่ามีอยู่ในฐานข้อมูลหรือไม่ ถ้าหากไม่มีให้ทำการสร้างผู้ใช้งานใหม่
 */

const getUser: GetUserFunctionType = async ({ LDAPemail, LDAPid, LDAPfullname, LDAPdepartment }) => {

    let user = await prisma.user.findFirst({
        where: {
            email: LDAPemail
        }
    })

    if (!user) {
        const createUser = await prisma.user.create({
            data: {
                email: LDAPemail.toLowerCase(),
                id: LDAPid,
                fullname: LDAPfullname.toLowerCase(),
                department: LDAPdepartment
            }
        })

        user = createUser
    }

    return user
}

export default getUser