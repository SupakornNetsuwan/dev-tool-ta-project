import { prisma } from "@/core/libs/prisma/connector"
import fs from "fs/promises"
import path, { join } from "path"

/**
 * @description ทำการลบไฟล์เก่าที่มีอยู่ออกไป
 */

type CheckRemoveOldFilesParams = (files: Record<"bookBankPath" | "classTablePath" | "transcriptPath" | "picturePath", string | null>, id: string) => Promise<void>

const checkRemoveOldFiles: CheckRemoveOldFilesParams = async (files, id) => {

    try {

        const documents = await prisma.userDocument.findUniqueOrThrow({
            where: {
                userId: id
            },
            select: {
                transcriptPath: true,
                bookBankPath: true,
                classTablePath: true,
                picturePath: true
            }
        })


        for (let [fileKey, filePath] of Object.entries(files)) {
            if (!filePath) continue
            const filePathFromDB = documents[fileKey as keyof typeof documents] // ตำแหน่งไฟล์ ตามปรเภทของไฟล์ (fileKey)
            if (filePathFromDB) {

                console.log("พบไฟล์เก่าที่มีอยู่ จะทำการลบ :",path.basename(filePathFromDB))

                /**
                 *  ทำการเช็คจากข้อมูลที่มี key ชื่อตาม fileKey ที่ได้จาก DB นั้นว่า
                 *  มีค่าเป็น null หรือไม่ ถ้าไม่แสดงว่ามีไฟล์เก่าอยู่แล้ว จึงทำการลบไฟล์เก่าออก
                 */

                await fs.unlink(join(process.cwd(), "public", filePathFromDB))
            }

        }

    } catch (error) {
        console.error("ไม่สามารถลบไฟล์เก่าที่มีอยู่ได้", error)
    }
}

export default checkRemoveOldFiles