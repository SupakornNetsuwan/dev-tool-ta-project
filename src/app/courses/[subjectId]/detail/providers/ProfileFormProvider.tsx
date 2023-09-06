"use client";
import React, { useEffect } from "react";
import { Prisma } from "@prisma/client";
import { FormProvider, SubmitHandler } from "react-hook-form";
// zod
import * as z from "zod";
// Hooks
import { useForm } from "react-hook-form";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import type { CourseDetailModifyType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import useGetSystemStatus from "@/core/hooks/systemStatus/useGetSystemStatus";
import { HiOutlineXMark } from "react-icons/hi2";
import useUpdateCourse from "@/core/hooks/courses/useUpdateCourse";
import { useRouter } from "next/navigation";

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
  const updateCourse = useUpdateCourse();
  const { openToast } = useCustomToast();
  const router = useRouter();
  const courseDetail = useGetCourse(subjectId);
  const systemStatus = useGetSystemStatus();
  const [courseDetailData, systemStatusData] = [courseDetail.data?.data.data, systemStatus.data?.data.data];
  const isLoading = courseDetail.status == "loading" || systemStatus.status == "loading";

  if (courseDetail.isError) throw courseDetail.error.response?.data.message;
  if (systemStatus.isError) throw systemStatus.error.response?.data.message;

  const methods = useForm<CourseDetailModifyType>({
    resolver: zodResolver(schema),
    values: {
      contact: courseDetailData?.contact || "",
      enrollCondition: courseDetailData?.enrollCondition || "",
      firstname: courseDetailData?.firstname || "",
      lastname: courseDetailData?.lastname || "",
      nameThai: courseDetailData?.nameThai || "",
      secretCode: courseDetailData?.secretCode || "",
      subjectId: subjectId,
      title: courseDetailData?.title || "นาย",
      semester: systemStatusData?.semester || 0,
      year: systemStatusData?.year || 0,
    },
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

  useEffect(() => {
    if (Object.values(methods.formState.errors).length > 0) {
      console.log(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  const onSubmit: SubmitHandler<CourseDetailModifyType> = (data) => {
    // type สำหรับส่วนของ course อย่างเดียวเราตัดส่วนที่เป็นของ system status ออกไป สำหรับการอัปเดต course
    const courseUpdateData: Omit<CourseDetailModifyType, keyof Prisma.SystemStatusGetPayload<{}>> = {
      contact: data.contact,
      enrollCondition: data.enrollCondition,
      firstname: data.firstname,
      lastname: data.lastname,
      secretCode: data.secretCode,
      title: data.title,
      nameThai: data.nameThai,
      subjectId: data.subjectId,
    };

    updateCourse.mutate(courseUpdateData, {
      onSuccess(data, variables, context) {
        courseDetail.refetch();
        systemStatus.refetch();
        router.back();
        openToast({
          title: <p className="text-blue-500">แก้ไขข้อมูลสำเร็จ 🎉</p>,
          description: <p>ข้อมูลรายวิชาแก้ไขแล้ว</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
      },
      onError(error, variables, context) {
        openToast({
          title: <p className="text-red-500">ไม่สามารถแก้ไขข้อมูลได้</p>,
          description: <p>{error.response?.data.message}</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`${isLoading && "pointer-events-none animate-pulse opacity-50"}`}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default ProfileFormProvider;
