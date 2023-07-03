"use client";
import React from "react";
import { FormProvider } from "react-hook-form";

const ProfileFormProvider = ({ children, ...methods }: any) => {
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ProfileFormProvider;
