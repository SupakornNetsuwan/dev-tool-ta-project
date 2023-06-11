import client from "./ldapConnector";

type LdapAuthType = (
    dn: string,
    password: string,
    callback: (isPasswordValid: boolean, error: Error | null) => void
) => Promise<void>

/**
 * @param dn 
 * @param password 
 * @description ทำการ Authenticate user ที่เจอหลังจากใช้ client.search เจอ
 */

const ldapAuth: LdapAuthType = async (dn, password, callback) => {
    console.log("กำลังทำการ Authenticate user...")

    try {
        const result = new Promise((resolve, reject) => {
            client.bind(dn, password, (error) => {
                error ? reject(error) : resolve(true)
            });
        })

        await result
        console.log("Authenticate user ผ่านแล้ว🎉...")
        callback(true, null)
    } catch (error) {
        // เมื่อเกิด error เช่นรหัสผ่านผิด และ อื่นๆ
        if (error instanceof Error) {
            return callback(false, error)
        }

        callback(false, new Error("Unknown error while checking is password matched"))
    }
}

export default ldapAuth