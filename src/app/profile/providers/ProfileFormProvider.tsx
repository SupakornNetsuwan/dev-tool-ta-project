"use client";
import React from "react";
import { FormProvider } from "react-hook-form";
// zod
import * as z from "zod";
// React hook form
import { useForm } from "react-hook-form";
import type { ProfileFormType } from "../types/ProfileFormType";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  id: z.string().nullish(),
  email: z.string().nullish(),
  title: z.string().nonempty({ message: "กรุณาเลือกคำนำหน้า" }),
  firstname: z.string().nonempty({ message: "กรุณากรอกชื่อจริง" }),
  lastname: z.string().nonempty({ message: "กรุณากรอกนามสกุล" }),
  address: z.string().nonempty({ message: "กรุณากรอกที่อยู่" }),
  bookBankNumber: z.string().transform(val => parseInt(val)).pipe(z.number({invalid_type_error:"โปรดกรอกตัวเลข"})),
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

const ProfileFormProvider = ({ children }: any) => {
  const methods = useForm<ProfileFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: "",
      firstname: "",
      title: "นาย",
      address: "",
      email: "",
      lastname: "",
      phoneNumber: "",
      bookBankNumber: "",
      UserDocument: {
        bookBankPath: null,
        classTablePath: null,
        picturePath: null,
        transcriptPath: null,
      },
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ProfileFormProvider;
