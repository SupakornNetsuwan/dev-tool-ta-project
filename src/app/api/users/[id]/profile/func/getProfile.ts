import { prisma } from "@/core/libs/prisma/connector";
import type { ProfileFormType } from "../ProfileFormType";

const getProfile = async (userId: string): Promise<ProfileFormType | null> => {
    const profile = await prisma.profile.findUnique({
        where: {
            id: userId
        },
        include: {
            UserDocument: {
                select: {
                    bookBankPath: true,
                    classTablePath: true,
                    picturePath: true,
                    transcriptPath: true
                }
            }
        }
    });

    return profile
}

export default getProfile;