import { z } from "zod"

const schema = z.object({
    courseInMajors: z.enum(["ARTIFICIAL_INTELLIGENCE_TECHNOLOGY", "INFORMATION_TECHNOLOGY", "BUSINESS_INFORMATION_TECHNOLOGY_INTERNATIONAL_PROGRAM", "DATA_SCIENCE_AND_BUSINESS_ANALYTICS"], {
        errorMap: (issue, ctx) => ({ message: "โปรดเลือกวิชาที่ช่วยสอนอยู่ในหลักสูตรวิทยศาสตรบันฑิตที่ถูกต้อง" })
    }),
    passedInMajors: z.enum(["ARTIFICIAL_INTELLIGENCE_TECHNOLOGY", "INFORMATION_TECHNOLOGY", "BUSINESS_INFORMATION_TECHNOLOGY_INTERNATIONAL_PROGRAM", "DATA_SCIENCE_AND_BUSINESS_ANALYTICS"], {
        errorMap: (issue, ctx) => ({ message: "โปรดเลือกผลของการเรียนของผู้ช่วยสอนหรือเทียบเคียง (สอบผ่านในหลักสูตร) ที่ถูกต้อง" })
    }),
    degree: z.enum(["BACHELOR_DEGREE", "MASTER_DEGREE"], {
        errorMap: (issue, ctx) => ({ message: "โปรดเลือกระดับการศึกษาที่ถูกต้อง" })
    }),
    grade: z.enum(["A", "B_PLUS", "B", "C_PLUS", "C", "D_PLUS", "D", "F"], {
        errorMap: (issue, ctx) => ({ message: "โปรดเลือกเกรดที่ถูกต้อง" })
    }),
    passedCourse: z.array(z.object({
        subjectId: z.string({
            required_error: "โปรดกรอกรหัสวิชา",
            invalid_type_error: "ประเภทข้อมูลไม่ถูกต้อง"
        }).nonempty({
            message: "โปรดกรอกรหัสวิชา"
        }),
        subjectName: z.string({
            required_error: "โปรดกรอกชื่อวิชา",
            invalid_type_error: "ประเภทข้อมูลไม่ถูกต้อง",
        }).nonempty({
            message: "โปรดกรอกชื่อวิชา"
        }),
    }), {
        required_error: "โปรดกรอกวิชาที่ผ่าน",
    }),
    secretCode:z.string().optional()
})

export default schema