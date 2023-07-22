"use client";
import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";
// zod
import * as z from "zod";
// Hooks
import { useForm } from "react-hook-form";
import type { DetailCourseModifyType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetCourseDetail from "@/app/manage/subjects/[subjectId]/hook/useGetCourseDetail";
import useGetSystemStatus from "@/app/manage/status/hooks/useGetSystemStatus";

// const schema = z.object({
//   id: z.string().nullish(),
//   email: z.string().nullish(),
//   title: z.string().nonempty({ message: "กรุณาเลือกคำนำหน้า" }),
//   firstname: z.string().nonempty({ message: "กรุณากรอกชื่อจริง" }),
//   lastname: z.string().nonempty({ message: "กรุณากรอกนามสกุล" }),
//   address: z.string().nonempty({ message: "กรุณากรอกที่อยู่" }),
//   bookBankNumber: z.string().transform(val => parseInt(val)).pipe(z.number({invalid_type_error:"โปรดกรอกตัวเลข"})),
//   phoneNumber: z
//     .string()
//     .nonempty({ message: "กรุณากรอกเบอร์โทรศัพท์" })
//     .startsWith("0", { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" })
//     .length(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก" })
//     .refine((value) => new RegExp(/^0[0-9]{9}$/).test(value), {
//       message: "กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข",
//     }),
//   UserDocument: z.object({
//     bookBankPath: z.any().nullish(),
//     classTablePath: z.any().nullish(),
//     picturePath: z.any().nullish(),
//     transcriptPath: z.any().nullish(),
//   }),
// });

const ProfileFormProvider = ({ children, subjectId }: { children: React.ReactNode; subjectId: string }) => {
  const getCourseDetailQuery = useGetCourseDetail(subjectId);
  const getSystemStatus = useGetSystemStatus();
  const methods = useForm<DetailCourseModifyType>({
    // resolver: zodResolver(schema),
    defaultValues: {
      contact: "",
      enrollCondition: "",
      firstname: "",
      lastname: "",
      nameThai: "",
      secretCode: "",
      subjectId: subjectId,
      title: "นาย",
      semester: 0,
      year: 0,
    },
  });

  if (getCourseDetailQuery.isError) throw getCourseDetailQuery.error;
  if (getSystemStatus.isError) throw getSystemStatus.error;

  useEffect(() => {
    // ทำการ Fetch ข้อมูลในส่วนของ​ Basic course detail ทั่ว ๆ ไป 🧠
    if (getCourseDetailQuery.isSuccess) {
      const courseDetail = getCourseDetailQuery.data.data.data;
      methods.setValue("contact", courseDetail.contact);
      methods.setValue("enrollCondition", courseDetail.enrollCondition);
      methods.setValue("firstname", courseDetail.firstname);
      methods.setValue("lastname", courseDetail.lastname);
      methods.setValue("nameThai", courseDetail.nameThai);
      methods.setValue("secretCode", courseDetail.secretCode);
    }
  }, [getCourseDetailQuery.isSuccess, methods, getCourseDetailQuery.data?.data.data]);

  useEffect(() => {
    // ทำการ Fetch ข้อมูลในส่วนของ​ System status 🧠
    if (getSystemStatus.isSuccess) {
      const systemStatus = getSystemStatus.data.data.data;
      methods.setValue("semester", systemStatus?.semester || 0);
      methods.setValue("year", systemStatus?.year || 0);
    }
  }, [getSystemStatus.isSuccess, methods, getSystemStatus.data?.data.data]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ProfileFormProvider;
