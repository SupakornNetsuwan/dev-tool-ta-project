import { z } from "zod"

/**
 * @description สำหรับการ validate form ของ THEORY
 */

export const OTHER_formSchema = z.object({
    TaForms: z.array(
        z.object({
            groupNumber: z.string({ required_error: "โปรดกรอกเลขกลุ่ม" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "เลขกลุ่มต้องเป็นตัวเลข" }),
            subjectId: z.string().nonempty({ message: "ขาดรหัสวิชาอาจมีข้อผิดพลาดบางอย่างเกิดขึ้น" }),
            taWorkDay: z.string().nonempty({ message: "โปรดกรอกวันปฏิบัติงาน" }),
            taHireDuration: z.string().nonempty({ message: "โปรดกรอกระยะเวลาการจ้าง" }),
            taTask: z.string().nonempty({ message: "โปรดกรอกงานที่ได้รับมอบหมาย" }),
            taCertificate: z.string().nonempty({ message: "โปรดกรอกคุณวุฒิ" }),
        })
    )
})
