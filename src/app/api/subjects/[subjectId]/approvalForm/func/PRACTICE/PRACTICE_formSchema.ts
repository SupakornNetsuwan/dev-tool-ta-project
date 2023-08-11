import { z } from "zod"

/**
 * @description สำหรับการ validate form ของ PRACTICE
 */

export const PRACTICE_formSchema = z.object({
    TaForms: z.array(
        z.object({
            subjectId: z.string({ required_error: "ขาดรหัสวิชาอาจมีข้อผิดพลาดบางอย่างเกิดขึ้น" }).nonempty({message:"ขาดรหัสวิชาอาจมีข้อผิดพลาดบางอย่างเกิดขึ้น"}),
            groupNumber: z.string({ required_error: "โปรดกรอกเลขกลุ่ม" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "เลขกลุ่มต้องเป็นตัวเลข" }),
            studentAmount: z.string({ required_error: "โปรดกรอกจำนวนนักศึกษา" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "จำนวนนักศึกษาต้องเป็นตัวเลข" }),
            taAmount: z.string({ required_error: "โปรดกรอกจำนวนผู้ช่วยสอน" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "ผู้ช่วยสอนต้องเป็นตัวเลข" }),
            taWorkDay: z.string({ required_error: "โปรดเลือกวันช่วยสอน" }),
            taWorkDayStart: z.string({ required_error: "โปรดกรอกเวลาเริ่มต้น" }).datetime({ message: "โปรดกรอกเป็นเวลา ISO" }),
            taWorkDayEnd: z.string({ required_error: "โปรดกรอกเวลาสิ้นสุด" }).datetime({ message: "โปรดกรอกเป็นเวลา ISO" }),
            taOtherWorkDay: z.string({ required_error: "โปรดเลือกวันปฏิบัติงานอื่น" }).nullish(),
            taOtherWorkDayStart: z.string({ required_error: "โปรดกรอกเวลาเริ่มต้น" }).datetime({ message: "โปรดกรอกเป็นเวลา ISO" }).nullish(),
            taOtherWorkDayEnd: z.string({ required_error: "โปรดกรอกเวลาสิ้นสุด" }).datetime({ message: "โปรดกรอกเป็นเวลา ISO" }).nullish(),
            taHireDuration: z.string({ required_error: "โปรดกรอกระยะเวลาการจ้าง" }).nonempty({message:"โปรดกรอกระยะเวลาการจ้าง"}),
        })
    )
})
