import type { ProfileFormType } from "../ProfileFormType"
import { prisma } from "@/core/libs/prisma/connector"
import { ZodError, z } from "zod"

const profileSchema = z.object({
    id: z.string(),
    email: z.string().nullish(),
    title: z.string().refine(value => ["นาย", "นางสาว", "นาง"].includes(value), { message: "กรุณาเลือกคำนำหน้า" }),
    firstname: z.string().nonempty({ message: "กรุณากรอกชื่อจริง" }),
    lastname: z.string().nonempty({ message: "กรุณากรอกนามสกุล" }),
    address: z.string().nonempty({ message: "กรุณากรอกที่อยู่" }),
    bookBankNumber: z.string().nonempty({ message: "กรุณากรอกเลขที่บัญชีธนาคาร" }),
    phoneNumber: z
        .string()
        .nonempty({ message: "กรุณากรอกเบอร์โทรศัพท์" })
        .startsWith("0", { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" })
        .length(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก" })
        .refine((value) => new RegExp(/^0[0-9]{9}$/).test(value), {
            message: "กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข",
        }),
    UserDocument: z.object({
        bookBankPath: z.any().nullish(),
        classTablePath: z.any().nullish(),
        picturePath: z.any().nullish(),
        transcriptPath: z.any().nullish(),
    }),
})

const updateProfile = async (toUpdatePayload: Omit<ProfileFormType, "email">): Promise<ProfileFormType> => {
    const { title, firstname, lastname, address, phoneNumber, id, UserDocument, bookBankNumber } = toUpdatePayload
    const { bookBankPath, classTablePath, picturePath, transcriptPath } = UserDocument || {};

    console.log(".\n.\n.\nข้อมูลที่ได้รับมา และ เตรียมจัดเก็บ :", {
        title, firstname, lastname, address, phoneNumber, id, bookBankNumber, UserDocument: {
            classTablePath, transcriptPath, picturePath, bookBankPath
        }
    });

    try {
        profileSchema.parse({
            id,
            firstname,
            lastname,
            title,
            bookBankNumber,
            address,
            phoneNumber,
            UserDocument: {
                bookBankPath,
                classTablePath,
                picturePath,
                transcriptPath,
            },
        },)
    } catch (error) {
        if (error instanceof ZodError) throw new Error(error.errors[0].message)
    }

    const updated = await prisma.profile.upsert({
        where: { id: id },
        create: {
            id,
            address,
            title,
            firstname,
            lastname,
            bookBankNumber,
            phoneNumber,
            UserDocument: {
                connectOrCreate: {
                    where: { userId: id },
                    create: {
                        bookBankPath,
                        classTablePath,
                        picturePath,
                        transcriptPath,
                    }
                }
            }
        },
        update: {
            address,
            title,
            firstname,
            lastname,
            bookBankNumber,
            phoneNumber,
            UserDocument: {
                upsert: {
                    create: {
                        bookBankPath,
                        classTablePath,
                        picturePath,
                        transcriptPath,
                    },
                    update: {
                        ...(bookBankPath && { bookBankPath }),
                        ...(classTablePath && { classTablePath }),
                        ...(picturePath && { picturePath }),
                        ...(transcriptPath && { transcriptPath }),
                    }
                }

            }
        },
        include: {
            UserDocument: {
                select: {
                    bookBankPath: true,
                    classTablePath: true,
                    picturePath: true,
                    transcriptPath: true,
                }
            }
        }
    })

    return updated
}

export default updateProfile