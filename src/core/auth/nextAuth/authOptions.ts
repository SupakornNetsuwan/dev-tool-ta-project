import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import findUser from "../ldap/ldapFindUser"
// Helper for development
import checkExistUser from "./helper/checkExistUser"
import checkExistFakeUser from './helper/checkExistFakeUser'
import storeFakeUser from './helper/storeFakeUser'
import storeUser from "./helper/storeUser"

export const isUsingFakeUser = false;

/**
 * @description ทำการ export ตัว authOptions ออกไปให้ next-auth ใช้งาน (Next.js 13.0.0 ขึ้นไป)
 */

const authOptions: NextAuthOptions = {
    providers: [CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        type: "credentials",
        id: "tawebsite",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            username: { label: "username", type: "text", name: "username" },
            password: { label: "password", type: "password", name: "password" }
        },
        async authorize(credentials, req) {
            let { username, password } = credentials || { username: "", password: "" };
            if (username.toLowerCase().includes("@kmitl.ac.th")) username = username.toLowerCase().replace("@kmitl.ac.th", "")

            if (isUsingFakeUser) {
                if (!username || !password) throw new Error("โปรดระบุชื่อผู้ใช้ และ รหัสผ่านของบัญชีทดสอบ")
                const existedFakeUser = await checkExistFakeUser(username, password)
                if (existedFakeUser) return existedFakeUser
                const fakeUser = await storeFakeUser(username, password)
                return fakeUser
            }

            // ตรวจสอบผู้ใช้งานจาก DB ก่อนว่ามีมั้ยผู้ใช้มั้ยโดยการเทียบ username กับ hashed password
            const existedUser = await checkExistUser(username, password)
            if (existedUser) return existedUser

            const { LDAPuser, LDAPerror } = await findUser(username, password)

            if (LDAPerror) {
                switch (LDAPerror.message) {
                    case "User not found":
                        console.log("ไม่พบผู้ใช้งานที่มีชื่อผู้ใช้ดังกล่าว")
                        throw new Error("ไม่พบผู้ใช้งานที่มีชื่อผู้ใช้ดังกล่าว")
                    case "Invalid Credentials":
                        console.log("รหัสผ่านผิด")
                        throw new Error("รหัสผ่านผิด")
                    case "Unwilling To Perform":
                        console.log("โปรดตรวจสอบรหัสผ่าน")
                        throw new Error("โปรดตรวจสอบรหัสผ่าน")
                    case "must either provide a buffer via `raw` or some `value`":
                        console.log("โปรดกรอกข้อมูลให้ครบถ้วน")
                        throw new Error("โปรดกรอกข้อมูลให้ครบถ้วน")
                    default:
                        console.error("🔴 เกิดปัญหาที่ไม่สามารถระบุได้ :", LDAPerror.message)
                        throw new Error("เกิดปัญหาที่ไม่สามารถระบุได้ : " + LDAPerror.message)
                }
            }

            // ข้อมูลผู้ใช้จาก LDAP เช่น
            // 
            // LDAPdepartment = 'it',
            // LDAPemail = '64070108@KMITL.AC.TH',
            // LDAPid = '64070108',
            // LDAPfullname = 'SUPAKORN NETSUWAN'
            // 

            const LDAPdepartment = LDAPuser.attributes[0].values[0]
            const LDAPemail = LDAPuser.attributes[5].values[0]
            const LDAPid = LDAPuser.attributes[6].values[0]
            const LDAPfullname = LDAPuser.attributes[7].values[0]

            // ทำการเช็คว่า มีผู้ใช้ในฐานข้อมูลของเราหรือไม่ถ้ามีแสดงว่ารหัสผ่านมีการเปลี่ยนแปลงก็ทำการอัพเดท ถ้าไม่มีก็ทำการสร้างผู้ใช้ใหม่
            const user = await storeUser({ LDAPid, LDAPemail, LDAPfullname, LDAPdepartment, password })

            // ส่งค่ากลับไป 🎉
            // return user || null
            return user
        }
    })],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 6, // 6 hours
        updateAge: 0 // 1 minute
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            return true
        },
        async redirect({ url, baseUrl }) {
            // ทำงานเมื่อมีการ redirect (เช่น signIn / signOut)

            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async jwt({ token, user, account, profile }) {

            if (account) {
                token.createdAt = user.createdAt
                token.email = user.email
                token.id = user.id
                token.fullname = user.fullname
                token.role = user.role
                token.department = user.department
            }

            return token
        },
        async session({ session, token, user }) {
            session.user.role = token.role
            session.user.department = token.department
            session.user.fullname = token.fullname
            session.user.id = token.id
            return session
        }
    }
}

export default authOptions;