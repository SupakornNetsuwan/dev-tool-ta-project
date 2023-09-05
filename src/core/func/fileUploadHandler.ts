import mime from "mime"
import { join } from "path"
import { stat, mkdir, writeFile } from "fs/promises"

/**
 * @description ทำการอัปโหลดไฟล์เข้าสู่ Server
 * @param file - ไฟล์ที่จะอัปโหลด
 * @param folderName - ชื่อโฟลเดอร์ที่จะเก็บไฟล์ ซึ่งจะอยู่ในลำดับดังนี้ /public/uploads/{ชื่อโฟลเดอร์}/{ชื่อไฟล์}
 * @returns `null | string`
 */

const fileUploadHandler = async (file: FormDataEntryValue | null, folderName: string, tracker: string | null = "", accept?: string[]) => {
    tracker += tracker ? " :" : ""

    if (!file) {
        console.log(`${tracker} ไม่มีไฟล์แนบมา ทำการข้าม.... 🟡`);
        return null
    }

    if (typeof file == "string") {
        console.log(`${tracker} ข้อมูลที่ส่งมาไม่ใช่ไฟล์แต่เป็นจำพวกตัวอักษร!? 🔴`);
        throw new Error("ข้อมูลที่ส่งมาไม่ใช่ไฟล์แต่เป็นจำพวกตัวอักษร")
    }

    console.log(`${tracker} ได้รับไฟล์แล้ว ประเภทของไฟล์ 🪄 : ${file.type}`);

    if (accept) {
        if (!accept.includes(file.type.toLowerCase())) {
            console.log(`ประเภทของไฟล์ไม่ถูกต้อง`);
            throw new Error(`ประเภทของไฟล์ไม่ถูกต้อง โปรดใช้ ${accept.join(" / ")}`)
        }
    } else {
        // ถ้าไม่มีการกำหนดประเภทไฟล์ก็ให้เป็นพวก รูป และ PDF
        if (!["image/jpeg", "image/jpg", "image/png", "application/pdf"].includes(file.type.toLowerCase())) {
            console.log(`ประเภทของไฟล์ไม่ถูกต้อง`);
            throw new Error("ประเภทของไฟล์ไม่ถูกต้อง โปรดใช้ png / jpg / jpeg / pdf")
        }
    }


    if (file.size >= 10000000) {
        console.log(`${tracker} ไฟล์ใหญ่เกินกว่า 1,0000,000 Byte (10 MB) 🔴`);
        throw new Error(`ไฟล์ ${file.name} มีขนาดใหญ่เกินกว่า 10 MB`)
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/${folderName}`
    const uploadDir = join(process.cwd(), "public", relativeUploadDir); // Directory สำหรับจัดเก็บไฟล์ที่อัปโหลดเข้ามา

    try {
        await stat(uploadDir)
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.startsWith("ENOENT: no such file or directory")) {
                console.log(`${tracker} ยังไม่มีไดเรกเทอรี่กำลังสร้าง...`);
                await mkdir(uploadDir, { recursive: true });
            }
        } else {
            console.error("มีปัญหาเกิดขึ้น ขณะพยายามสร้างไดเรกทอรีให้กับไฟล์ที่อัปโหลด 🔴\n", error);
            throw error
        }
    }

    try {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${file.name.replace(/\.[^/.]+$/, "").replaceAll(" ", "-")}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);

        console.log(`${tracker} ทำการบันทึกไฟล์สำเร็จ 🟢 ไฟล์ชื่อว่า ${filename}`);

        return join(relativeUploadDir, filename)
    } catch (error) {
        console.error("มีปัญหาเกิดขึ้น ขณะที่อัปโหลดไฟล์ 🔴\n", error);
        throw error
    }


}

export default fileUploadHandler