import type { ProfileFormType } from "@/app/profile/types/ProfileFormType"
import { prisma } from "@/core/libs/prisma/connector"

const updateProfile = async (toUpdatePayload: ProfileFormType): Promise<ProfileFormType> => {
    const { title, firstname, lastname, address, phoneNumber, email, id, UserDocument } = toUpdatePayload
    const { bookBankPath, classTablePath, picturePath, transcriptPath } = UserDocument || {};

    console.log(".\n.\n.\nข้อมูลที่ได้รับมา และ เตรียมจัดเก็บ :", {
        title, firstname, lastname, address, phoneNumber, email, id, UserDocument: {
            classTablePath, transcriptPath, picturePath, bookBankPath
        }
    });

    const updated = await prisma.profile.upsert({
        where: { id: id },
        create: {
            id,
            address,
            title,
            firstname,
            lastname,
            email,
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