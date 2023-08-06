import type { ProfileFormType } from "../ProfileFormType"
import { prisma } from "@/core/libs/prisma/connector"
import { ZodError, z } from "zod"
import profileFormSchema from "./profileFormSchema"

const updateProfile = async (toUpdatePayload: ProfileFormType): Promise<ProfileFormType> => {
    const { title, firstname, lastname, address, phoneNumber, email, id, UserDocument, bankName, degree, bookBankNumber } = toUpdatePayload
    const { bookBankPath, classTablePath, picturePath, transcriptPath } = UserDocument || {};

    console.log(".\n.\n.\nข้อมูลที่ได้รับมา และ เตรียมจัดเก็บ :", {
        title, firstname, lastname, address, phoneNumber, id, bankName, email, degree, bookBankNumber, UserDocument: {
            classTablePath, transcriptPath, picturePath, bookBankPath
        }
    });

    try {
        profileFormSchema.parse({
            id,
            firstname,
            lastname,
            title,
            email,
            bankName,
            degree,
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
        console.log(error);
        if (error instanceof ZodError) throw new Error(error.errors[0].message)
    }

    const updated = await prisma.profile.upsert({
        where: { id: id },
        create: {
            id,
            address,
            email,
            title,
            firstname,
            lastname,
            bankName,
            degree,
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
            email,
            bankName,
            degree,
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