"use client";
import React, { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "@/app/api/subjects/studentView/[subjectId]/enrollCourse_formSchema";
import type { EnrollCourseFormType } from "@/app/api/subjects/studentView/[subjectId]/FullCourseWithEnrollStatusType";
import useEnrollCourse from "@/core/hooks/studentView/useEnrollCourse";
import { useParams } from "next/navigation";
import useGetFullCourseWithEnrollStatus from "@/core/hooks/studentView/useGetFullCourseWithEnrollStatus";
import { HiOutlineXMark } from "react-icons/hi2";
import LoadingSkeletonEnrollForm from "../components/LoadingSkeletonEnrollForm";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import { useQueryClient } from "@tanstack/react-query";

const CourseEnrollFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openToast } = useCustomToast();
  const { subjectId } = useParams();
  const { isLoading } = useGetFullCourseWithEnrollStatus(subjectId);
  const enrollCourse = useEnrollCourse(subjectId);
  const queryClient = useQueryClient();

  const methods = useForm<EnrollCourseFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      courseInMajors: "INFORMATION_TECHNOLOGY",
      passedInMajors: "INFORMATION_TECHNOLOGY",
      degree: "BACHELOR_DEGREE",
      grade: "B",
      passedCourse: [{ subjectId: "", subjectName: "" }],
      secretCode: "",
    },
  });

  // 🚧
  useEffect(() => {
    if (Object.values(methods.formState.errors).length > 0) {
      console.log(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  const onSubmit: SubmitHandler<EnrollCourseFormType> = (data) => {
    enrollCourse.mutate(
      {
        courseInMajors: data.courseInMajors,
        degree: data.degree,
        grade: data.grade,
        passedCourse: data.passedCourse,
        passedInMajors: data.passedInMajors,
        secretCode: data.secretCode,
      },
      {
        onSuccess(data, variables, context) {
          openToast({
            title: <p className="text-blue-500">สมัครสำเร็จ 🎉</p>,
            description: <p>{data.data.message}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
          queryClient.invalidateQueries(["getFullCourseWithEnrollStatus", subjectId]);
        },
        onError(error, variables, context) {
          openToast({
            title: <p className="text-red-500">ไม่สามารถสมัครได้</p>,
            description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
      }
    );
    // TODO : ทำ invalate query
  };

  if (isLoading) return <LoadingSkeletonEnrollForm />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default CourseEnrollFormProvider;
