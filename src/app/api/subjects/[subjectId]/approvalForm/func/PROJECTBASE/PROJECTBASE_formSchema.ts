import { z } from "zod"

/**
 * @description สำหรับการ validate form ของ PROJECTBASE
 */

export const PROJECTBASE_formSchema = z.object({
    TaForms: z.array(
        z.object({
            groupNumber: z.string({ required_error: "โปรดกรอกเลขกลุ่ม" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "เลขกลุ่มต้องเป็นตัวเลข" }),
            studentAmount: z.string({ required_error: "โปรดกรอกจำนวนนักศึกษา" }).refine(value => new RegExp(/^\d+$/).test(value), { message: "จำนวนนักศึกษาต้องเป็นตัวเลข" }),
            subjectId: z.string().nonempty({ message: "ขาดรหัสวิชาอาจมีข้อผิดพลาดบางอย่างเกิดขึ้น" }),
            otherTaWorkDay: z.string().nonempty({ message: "โปรดกรอกวันปฏิบัติงานอื่น" }),
            otherTaTeachDay: z.string().nonempty({ message: "โปรดกรอกวันสอนเสริมอื่น" }),
        })
    )
})
