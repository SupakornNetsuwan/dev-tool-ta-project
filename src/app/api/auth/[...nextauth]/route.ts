import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import getUser from "@/core/libs/ldap"

export const authOptions = {
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

            getUser(username, password)

            const user = { id: "1", name: 'J Smith', email: 'jsmith@example.com' };
            if (user) return new Promise((resolve) => resolve(user))
            return null
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }