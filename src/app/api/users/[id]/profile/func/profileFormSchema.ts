import { z } from "zod"

// const profileSchema = z.object({
//     id: z.string(),
//     email: z.string().nullish(),
//     title: z.string().refine(value => ["นาย", "นางสาว", "นาง"].includes(value), { message: "กรุณาเลือกคำนำหน้า" }),
//     firstname: z.string().nonempty({ message: "กรุณากรอกชื่อจริง" }),
//     lastname: z.string().nonempty({ message: "กรุณากรอกนามสกุล" }),
//     address: z.string().nonempty({ message: "กรุณากรอกที่อยู่" }),
//     bookBankNumber: z.string().nonempty({ message: "กรุณากรอกเลขที่บัญชีธนาคาร" }),
//     bankName: z.string().nonempty({ message: "กรุณาเลือกธนาคารที่ใช้" }),
//     degree: z.string().nonempty({ message: "กรุณากรอกระดับการศึกษา" }),
//     phoneNumber: z
//         .string()
//         .nonempty({ message: "กรุณากรอกเบอร์โทรศัพท์" })
//         .startsWith("0", { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" })
//         .length(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก" })
//         .refine((value) => new RegExp(/^0[0-9]{9}$/).test(value), {
//             message: "กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข",
//         }),
//     UserDocument: z.object({
//         bookBankPath: z.any().nullish(),
//         classTablePath: z.any().nullish(),
//         picturePath: z.any().nullish(),
//         transcriptPath: z.any().nullish(),
//     }),
// })

const profileFormSchema = z.object({
    id: z.string().nullish(),
    email: z.string().nullish(),
    title: z.string().nonempty({ message: "กรุณาเลือกคำนำหน้า" }),
    firstname: z.string().nonempty({ message: "กรุณากรอกชื่อจริง" }),
    lastname: z.string().nonempty({ message: "กรุณากรอกนามสกุล" }),
    address: z.string().nonempty({ message: "กรุณากรอกที่อยู่" }),
    bankName: z.string().nonempty({ message: "กรุณาเลือกธนาคารที่ใช้" }),
    degree: z.string().nonempty({ message: "กรุณาเลือกระดับการศึกษา" }),
    bookBankNumber: z
        .string()
        .refine((value) => new RegExp(/^\d+$/).test(value), {
            message: "โปรดกรอกเลขบัญชีเป็นตัวเลข",
        }),
    phoneNumber: z
        .string()
        .nonempty({ message: "กรุณากรอกเบอร์โทรศัพท์" })
        .startsWith("0", { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" })
        .length(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก" })
        .refine((value) => new RegExp(/^0[0-9]{9}$/).test(value), {
            message: "กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข",
        }),
    UserDocument: z.object({
        bookBankPath: z.any().nullish(),
        classTablePath: z.any().nullish(),
        picturePath: z.any().nullish(),
        transcriptPath: z.any().nullish(),
    }),
});

export default profileFormSchema