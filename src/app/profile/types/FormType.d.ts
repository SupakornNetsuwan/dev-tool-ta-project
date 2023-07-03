import type { Prisma, Profile } from "@prisma/client";

export type FormType = Prisma.ProfileGetPayload<{ include: { UserDocument: true } }>