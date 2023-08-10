import { z } from "zod"

/**
 * @description สำหรับการ validate form ของ PROJECTBASE
 */

export const PROJECTBASE_formSchema = z.object({
    TaForms: z.array(
        z.object({
            subjectId: z.string().nonempty({ message: "ขาดรหัสวิชาอาจมีข้อผิดพลาดบางอย่างเกิดขึ้น" }),
            groupNumber: z.string({ required_error: "โปรดกรอกเลขกลุ่ม" }).nonempty({ message: "โปรดกรอกเลขกลุ่ม" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "เลขกลุ่มต้องเป็นตัวเลข" }),
            studentAmount: z.string({ required_error: "โปรดกรอกจำนวนนักศึกษา" }).nonempty({ message: "โปรดกรอกจำนวนนักศึกษา" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "จำนวนนักศึกษาต้องเป็นตัวเลข" }),
            taAmount: z.string({ required_error: "โปรดกรอกจำนวนผู้ช่วยสอน" }).nonempty({ message: "โปรดกรอกจำนวนผู้ช่วยสอน" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "ผู้ช่วยสอนต้องเป็นตัวเลข" }),
            taWorkDay: z.string().nonempty({ message: "โปรดกรอกวันช่วยสอน" }),
            taWorkDayStart: z.string({ required_error: "โปรดกรอกเวลาเริ่มต้น" }).nonempty().datetime({ message: "โปรดกรอกเป็นเวลา ISO" }),
            taWorkDayEnd: z.string({ required_error: "โปรดกรอกเวลาสิ้นสุด" }).nonempty().datetime({ message: "โปรดกรอกเป็นเวลา ISO" }),
            taOtherWorkDay: z.string().nonempty({ message: "โปรดกรอกวันปฏิบัติงานอื่น" }),
            taOtherWorkDayStart: z.string({ required_error: "โปรดกรอกเวลาเริ่มต้น" }).nonempty().datetime({ message: "โปรดกรอกเป็นเวลา ISO" }),
            taOtherWorkDayEnd: z.string({ required_error: "โปรดกรอกเวลาสิ้นสุด" }).nonempty().datetime({ message: "โปรดกรอกเป็นเวลา ISO" }),
        })
    )
})
