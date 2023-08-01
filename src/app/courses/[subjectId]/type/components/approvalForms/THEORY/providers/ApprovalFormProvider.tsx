"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { THEORY_formSchema } from "@/app/api/subjects/[subjectId]/approvalForm/func/THEORY/THEORY_formSchema";
import type { AxiosResponse } from "axios";
import type { FetchCourseTypeWithApprovementType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { THEORYFormType } from "@/app/api/subjects/[subjectId]/approvalForm/func/THEORY/THEORY";
import useUpdateOrCreateApprovalForm from "@/core/hooks/courses/approvalForm/useUpdateOrCreateApprovalForm";
import stringifiedObj from "@/core/func/stringifiedObj ";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import { HiOutlineXMark } from "react-icons/hi2";

/**
 * @description สำหรับฟอร์มขออนุมัติ TA ประเภท THEORY
 */

const ApprovalFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { subjectId } = useParams();
  const updateOrCreate = useUpdateOrCreateApprovalForm(subjectId);
  const { openToast } = useCustomToast();

  const data = queryClient.getQueryData<AxiosResponse<{ message: string; data: FetchCourseTypeWithApprovementType }>>([
    "getCoursesWithapprovalForm",
    subjectId,
  ]); // ทำการเข้าถึง cache จากการ fetch ที่ \type\components\CourseType.tsx ซึ่งยังไงมันก็มีการ fetch อยู่แล้ว จึงไม่มีทางที่จะเป็น null

  const methods = useForm<THEORYFormType>({
    resolver: zodResolver(THEORY_formSchema),
    values: {
      TaForms: data?.data.data?.TheoryForm.map((item) => stringifiedObj(item)) || [],
    },
    defaultValues: {
      TaForms: [],
    },
  });

  // console.log(methods.watch());

  useEffect(() => {
    if (Object.values(methods.formState.errors).length > 0) {
      console.log(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  const onSubmit: SubmitHandler<THEORYFormType> = (payload) => {

    updateOrCreate.mutate(
      { ...payload, approvalFormType: "THEORY" },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(["getCoursesWithapprovalForm", subjectId]);
          openToast({
            title: <p className="text-blue-500">สำเร็จ 🎉</p>,
            description: <p>{data.data.message}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
        onError(error, variables, context) {
          console.log("⚠️ :", error.response?.data.message);
          openToast({
            title: <p className="text-red-500">ไม่สามารถอัปเดตข้อมูลได้</p>,
            description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default ApprovalFormProvider;
