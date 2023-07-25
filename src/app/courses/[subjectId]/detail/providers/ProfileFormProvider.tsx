"use client";
import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";
// zod
import * as z from "zod";
// Hooks
import { useForm } from "react-hook-form";
import type { CourseDetailModifyType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetCourse from "@/app/manage/subjects/[subjectId]/hooks/useGetCourse";
import useGetSystemStatus from "@/app/manage/status/hooks/useGetSystemStatus";

const schema = z.object({
  contact: z.string().nonempty({ message: "กรุณากรอกช่องทางการติดต่อ" }),
  enrollCondition: z.string().nullish(),
  firstname: z.string().nonempty({ message: "กรุณากรอกชื่อจริงของผู้สอน" }),
  lastname: z.string().nonempty({ message: "กรุณากรอกนามสกุลของผู้สอน" }),
  nameThai: z.string().nonempty({ message: "ไม่พบชื่อวิชา อาจเกิดข้อผิดพลาด" }),
  secretCode: z.string().nullish(),
  subjectId: z.string().nonempty({ message: "ไม่พบรหัสวิชา อาจเกิดข้อผิดพลาด" }),
  title: z.string().nonempty({ message: "กรุณาเลือกคำนำหน้า" }),
  semester: z.number({ required_error: "ไม่พบปีการศึกษา อาจเกิดข้อผิดพลาด" }),
  year: z.number({ required_error: "ไม่พบภาคการศึกษา อาจเกิดข้อผิดพลาด" }),
});

const ProfileFormProvider = ({ children, subjectId }: { children: React.ReactNode; subjectId: string }) => {
  const getCourseDetailQuery = useGetCourse(subjectId);
  const getSystemStatus = useGetSystemStatus();
  const methods = useForm<CourseDetailModifyType>({
    resolver: zodResolver(schema),
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
      methods.setValue("title", courseDetail.title);
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
