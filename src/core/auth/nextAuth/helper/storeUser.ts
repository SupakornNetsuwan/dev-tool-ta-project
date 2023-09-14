import { prisma } from '@/core/libs/prisma/connector'
import type { User } from '@prisma/client'
import bcrypt from "bcrypt"

type StoreUserFunctionType = (params: {
    LDAPemail: string,
    LDAPid: string,
    LDAPfullname: string,
    LDAPdepartment: string
    password: string
}) => Promise<User>

/**
 * @precondition ต้องมีการเรียกข้อมูลผู้ใข้งานจาก LDAP ก่อน
 * @description ถ้าหากไม่มีผู้ใช้งานให้ทำการสร้างผู้ใช้งานใหม่ แต่ถ้าหากว่ามีก็อัปเดตรหัสผ่านใหม่
 */

const storeUser: StoreUserFunctionType = async ({ LDAPemail, LDAPid, LDAPfullname, LDAPdepartment, password }) => {
    const hashedPassword = await bcrypt.hash(password, 12)
    console.log("กำลังอัปเดตผู้ใช้ในฐานข้อมูล/เพิ่มผู้ใช้...")

    const role = new RegExp(/\d{8}/g).test(LDAPid) ? "STUDENT" : "PROFESSOR"

    try {
        const user = await prisma.user.upsert({
            where: {
                email: LDAPemail
            },
            update: {
                password: hashedPassword
            },
            create: {
                email: LDAPemail,
                id: LDAPid,
                fullname: LDAPfullname,
                password: hashedPassword,
                department: LDAPdepartment,
                role: role,
                Profile: {
                    connectOrCreate: {
                        where: {
                            id: LDAPid
                        },
                        create: {
                            address: "",
                            email: LDAPemail,
                            firstname: "",
                            lastname: "",
                            phoneNumber: "",
                            title: "",
                            UserDocument: {
                                connectOrCreate: {
                                    where: {
                                        userId: LDAPid
                                    },
                                    create: {
                                        bookBankPath: "",
                                        classTablePath: "",
                                        picturePath: "",
                                        transcriptPath: ""
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return user
    } catch (error) {
        if (error instanceof Error) throw error
        if (typeof error === "string") throw new Error(error.toString())
        if (error instanceof Object) throw new Error(JSON.stringify(error))
        throw new Error("Unknown error while saving user")
    }

}

export default storeUser