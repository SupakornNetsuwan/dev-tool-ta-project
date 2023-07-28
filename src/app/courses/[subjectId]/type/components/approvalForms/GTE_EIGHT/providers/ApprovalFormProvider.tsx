"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

/**
 * @description สำหรับฟอร์มขออนุมัติ TA ประเภท GTE_EIGHT
 */

const ApprovalFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      name: "x",
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ApprovalFormProvider;
