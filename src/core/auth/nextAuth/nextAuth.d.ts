import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import type { User as PrismaUser } from "@prisma/client"

declare module "next-auth" {

    interface Session {
        user: Omit<PrismaUser, "createdAt" | "password"> & DefaultSession["user"]
    }

    interface User extends PrismaUser { }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends PrismaUser { }
}