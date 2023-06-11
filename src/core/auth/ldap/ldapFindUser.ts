import util from "util"
import _ from "lodash"
import client, { base, filter_fmt } from "./ldapConnector";
import ldapAuth from './ldapAuth';
import type { FindUserType, LDAPuser } from "./ldapTypes"

const findUser: FindUserType = async (username, password) => {

    const opts = {
        filter: util.format(filter_fmt, username),
        scope: "sub"
    }

    try {
        /*
         ที่ต้องใช้ Promise เพราะว่า client.search มีการเรียกใช้ callback
         เลยต้องให้มัน reject ออกมา ไม่เช่นนั้นถ้าหาก throw error
         มันจะติดอยู่ใน callback function scope
        */

        const result = new Promise((resolve, reject) => {
            console.log("------------------------\nกำลังเริ่มต้นค้นหาผู้ใช้งาน...");

            let user = {};

            client.on('connectError', (error) => {
                // Handle connection error
                return reject(error)
            })

            // @ts-ignore
            client.search(base, opts, (error, res) => {
                if (error) return reject(error)

                // @ts-ignore
                // res.on('searchRequest', (searchRequest) => console.log('searchRequest: ', searchRequest.messageId));

                /**
                * @description เมื่อเจอ User จาก LDAP search จะแสดงที่นี่
                */
                // @ts-ignore
                res.on('searchEntry', (entry) => user = entry);

                /**
                * @description เมื่อค้นหาแล้วเกิด Error เกิดขึ้น
                */
                // @ts-ignore
                res.on('error', (error) => {
                    // console.error('error: ' + error.message);
                    return reject(error)
                });

                /**
                * @description จบการทำงาน result.status ควรจะเท่ากับ 0
                */
                // @ts-ignore
                res.on('end', async (result) => {
                    console.log(result.status === 0 ? "ปิดการค้นหาด้วยสถนะปกติ (status = 0) " : "มีปัญหาเกิดขึ้นระหว่าง client.search");
                    if (_.isEmpty(user)) return reject(new Error("User not found"))

                    // ตรวจสอบว่า Password ถูกต้อง หรือ ไม่
                    // @ts-ignore
                    await ldapAuth(user?.dn.toString(), password, (isPasswordValid, error) => {
                        if (isPasswordValid) {
                            // @ts-ignore
                            return user?.pojo ? resolve(user?.pojo) : reject(new Error("User not found after password was checked"))
                        } else {
                            return reject(error)
                        }
                    })
                });
            });
        })

        const searchResult = (await result) as LDAPuser

        return { LDAPuser: searchResult, LDAPerror: null }
    } catch (error) {

        // error เป็น error จริงๆ - ควรจะเป็น Default case
        if (error instanceof Error) {
            return { LDAPuser: null, LDAPerror: error }
        }

        // error เป็น string ธรรมดา
        if (error instanceof String) {
            return { LDAPuser: null, LDAPerror: new Error(error.toString()) }
        }

        // error เป็น object ธรรมดา - ทำให้เราไม่รู้ object structure ภายใน
        if (error instanceof Object) {
            return { LDAPuser: null, LDAPerror: new Error(JSON.stringify(error)) }
        }

        return { LDAPuser: null, LDAPerror: new Error("Unknown error") }
    } finally {
        // close conenction here
    }
}

export default findUser