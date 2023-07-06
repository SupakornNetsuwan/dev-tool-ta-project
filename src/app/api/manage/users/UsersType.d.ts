import { User } from "@prisma/client"
export type ResponseGetUsersType = Pick<User, "id" | "email" | "fullname" | "role" >[]
export type ResponseGetUserType = Pick<User, "id" | "email" | "fullname" | "role">
