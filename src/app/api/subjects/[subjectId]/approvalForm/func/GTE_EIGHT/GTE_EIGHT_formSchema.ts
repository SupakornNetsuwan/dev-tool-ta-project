import { z } from "zod"

/**
 * @description สำหรับการ validate form ของ GTE_EIGHT
 */

export const GTE_EIGHT_formSchema = z.object({
    TaForms: z.array(
        z.object({
            groupNumber: z.string({ required_error: "โปรดกรอกเลขกลุ่ม" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "เลขกลุ่มต้องเป็นตัวเลข" }),
            studentAmount: z.string({ required_error: "โปรดกรอกจำนวนนักศึกษา" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "จำนวนนักศึกษาต้องเป็นตัวเลข" }),
            taAmount: z.string({ required_error: "โปรดกรอกจำนวนผู้ช่วยสอน" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "ผู้ช่วยสอนต้องเป็นตัวเลข" }),
            taWorkDay: z.string().nonempty({ message: "โปรดกรอกวันเวลาช่วยสอน" }),
            taHireDuration: z.string().nonempty({ message: "โปรดกรอกระยะเวลาการจ้าง" }),
            subjectId: z.string().nonempty({ message: "ขาดรหัสวิชาอาจมีข้อผิดพลาดบางอย่างเกิดขึ้น" }),
        })
    )
})
