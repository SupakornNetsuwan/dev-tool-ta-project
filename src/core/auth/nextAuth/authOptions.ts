import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import findUser from "../ldap/ldapFindUser"

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
            const { username, password } = credentials || { username: "", password: "" };

            const { LDAPuser, LDAPerror } = await findUser(username, password)

            if (LDAPerror) {
                switch (LDAPerror.message) {
                    case "User not found":
                        // do smth...   
                        console.log("ไม่เจอ user ที่มี username ดังกล่าว")
                        break
                    case "Invalid Credentials":
                        // do smth...
                        console.log("รหัสผ่านผิด")
                        break
                    case "Unwilling To Perform":
                        // do smth...
                        console.log("ไม่สามารถค้นหาในระบบได้โปรดตรวจสอบข้อมูล ผู้ใช้งาน และ รหัสผ่าน")
                        break
                    case "must either provide a buffer via `raw` or some `value`":
                        // do smth...
                        console.log("โปรดกรอกข้อมูล ผู้ใช้งาน และ รหัสผ่าน")
                        break
                    default:
                        console.error("🔴 Unhandled error :", LDAPerror.message)
                }

                return null;
            }


            // ข้อมูลผู้ใช้จาก LDAP
            // console.warn(LDAPuser.attributes[5].values, LDAPuser.attributes[6].values, LDAPuser.attributes[7].values);

            // 1. ทำการเช็คว่า มีผู้ใช้ในฐานข้อมูลของเราหรือยัง
            // 2. ถ้าหากไม่มีให้สร้างใหม่ และ ดึงข้อมูลผู้ใช้มา
            // 3. ถ้ามีแล้วให้ดึงข้อมูลผู้ใช้มา

            const user = { id: "1", name: 'J Smith', email: 'jsmith@example.com' };
            if (user) return new Promise((resolve) => resolve(user))
            return null;
        }
    })],
    // callbacks: {
    //     async signIn({ user, account, profile, email, credentials }) {
    //         return true
    //     },
    //     async redirect({ url, baseUrl }) {
    //         return baseUrl
    //     },
    //     async session({ session, token, user }) {
    //         return session
    //     },
    //     async jwt({ token, user, account, profile, isNewUser }) {
    //         return token
    //     }
    // }
}

export default authOptions;