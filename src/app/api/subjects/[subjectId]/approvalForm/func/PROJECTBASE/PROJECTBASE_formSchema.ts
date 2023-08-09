import { z } from "zod"

/**
 * @description สำหรับการ validate form ของ PROJECTBASE
 */

export const PROJECTBASE_formSchema = z.object({
    TaForms: z.array(
        z.object({
            subjectId: z.string().nonempty({ message: "ขาดรหัสวิชาอาจมีข้อผิดพลาดบางอย่างเกิดขึ้น" }),
            groupNumber: z.string({ required_error: "โปรดกรอกเลขกลุ่ม" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "เลขกลุ่มต้องเป็นตัวเลข" }),
            studentAmount: z.string({ required_error: "โปรดกรอกจำนวนนักศึกษา" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "จำนวนนักศึกษาต้องเป็นตัวเลข" }),
            taAmount: z.string({ required_error: "โปรดกรอกจำนวนผู้ช่วยสอน" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "ผู้ช่วยสอนต้องเป็นตัวเลข" }),
            taWorkDay: z.string().nonempty({ message: "โปรดกรอกวันสอนเสริม" }),
            taWorkDayStart: z.date({ required_error: "โปรดกรอกเวลาเริ่มต้น" }),
            taWorkDayEnd: z.date({ required_error: "โปรดกรอกเวลาสิ้นสุด" }),
            taOtherWorkDay: z.string().nonempty({ message: "โปรดกรอกวันปฏิบัติงานอื่น" }),
            taOtherWorkDayStart: z.date({ required_error: "โปรดกรอกเวลาเริ่มต้น" }),
            taOtherWorkDayEnd: z.date({ required_error: "โปรดกรอกเวลาสิ้นสุด" }),
        })
    )
})
