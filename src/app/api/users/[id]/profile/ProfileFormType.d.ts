import type { Prisma, UserDocument } from "@prisma/client";

export type ProfileFormType = Prisma.ProfileGetPayload<{
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
}>
