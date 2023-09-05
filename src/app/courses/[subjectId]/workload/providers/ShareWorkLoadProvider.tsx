"use client";
import React, { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "@/app/api/subjects/[subjectId]/shareWorkLoad/shareWorkLoad_formSchema";
import type { CourseWorkLoadModifyType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import useCreateShareWorkLoad from "@/core/hooks/courses/shareWorkLoad/useCreateShareWork";
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import LoadingSkeleton from "../components/LoadingSkeleton";
import modifyFile from "../func/modifyFile";
import { HiOutlineXMark } from "react-icons/hi2";

const ShareWorkLoadProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { subjectId } = useParams();
  const { openToast } = useCustomToast();
  const { data: courseDetail, isLoading, isError, error } = useGetCourse(subjectId);
  const createShareWorkLoad = useCreateShareWorkLoad(subjectId);
  const methods = useForm<CourseWorkLoadModifyType>({
    resolver: zodResolver(schema),
    values: {
      shareWorkloadFile: courseDetail?.data.data.shareWorkloadFile,
    },
  });

  if (isError) throw new Error(error.response?.data.message);

  useEffect(() => {
    if (Object.values(methods.formState.errors).length > 0) {
      console.log(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  const onSubmit: SubmitHandler<CourseWorkLoadModifyType> = (data) => {
    
    createShareWorkLoad.mutate(
      {
        shareWorkloadFile: modifyFile(data.shareWorkloadFile),
      },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(["getCourses", subjectId]);
          openToast({
            title: <p className="text-blue-500">แก้ไขข้อมูลสำเร็จ 🎉</p>,
            description: <p>ข้อมูลรายวิชาแก้ไขแล้ว</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
        onError(error, variables, context) {
          openToast({
            title: <p className="text-blue-500">ไม่สามารถอัปโหลดไฟล์ได้</p>,
            description: <p>{error.response?.data.message}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
      }
    );
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default ShareWorkLoadProvider;
