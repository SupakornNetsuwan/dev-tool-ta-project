import { prisma } from "@/core/libs/prisma/connector";

const getProfile = async (userId: string) => {
    const profile = await prisma.profile.findUnique({
        where: {
            id: userId
        },
        include: {
            UserDocument: true
        }
    });

    return profile
}

export default getProfile;