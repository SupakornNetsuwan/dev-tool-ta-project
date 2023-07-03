"use client";
import React, { useEffect } from "react";
import FieldWrapper from "./FieldWrapper";
import ProfileFormHeader from "./ProfileFormHeader";
import useGetProfile from "../hooks/useGetProfile";
import * as Label from "@radix-ui/react-label";
// React hooks form
import { useForm, SubmitHandler } from "react-hook-form";
import type { FormType } from "../types/FormType";
import TitleSelector from "./TitleSelector";
import ProfileFormProvider from "../providers/ProfileFormProvider";

const ProfileForm = () => {
  const { data, isSuccess, isLoading } = useGetProfile();
  const methods = useForm<FormType>({
    defaultValues: {
      id: "",
      firstname: "",
      title: "",
      address: "",
      email: "",
      lastname: "",
      phoneNumber: "",
    },
  });
  const { handleSubmit, register, setValue } = methods;

  useEffect(() => {
    if (isSuccess) {
      const { id, title, email, firstname, lastname, address, phoneNumber } = data?.data.data || {};
      setValue("title", title);
      setValue("email", email);
      setValue("id", id);
      setValue("firstname", firstname);
      setValue("lastname", lastname);
      setValue("address", address);
      setValue("phoneNumber", phoneNumber);
    }
  }, [isSuccess, data?.data.data, setValue]);

  const submit: SubmitHandler<FormType> = (data) => {
    console.log(data);
  };

  return (
    <ProfileFormProvider {...methods}>
      <ProfileFormHeader isLoading={isLoading} />
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row [&>div]:flex-1">
          <FieldWrapper label={<Label.Root>คำนำหน้า</Label.Root>}>
            <TitleSelector />
          </FieldWrapper>
          <FieldWrapper label={<Label.Root>ชื่อจริง</Label.Root>}>
            <input
              type="text"
              {...register("firstname")}
              className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>
          <FieldWrapper label={<Label.Root>นามสกุล</Label.Root>}>
            <input
              type="text"
              {...register("lastname")}
              className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>
          <FieldWrapper label={<Label.Root>รหัสนักศึกษา</Label.Root>}>
            <input
              type="text"
              {...register("id", {
                disabled: true,
              })}
              className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>
        </div>
        <FieldWrapper label={<Label.Root>ที่อยู่ปัจจุบัน</Label.Root>}>
          <textarea
            rows={5}
            {...register("address")}
            className="w-full resize-none rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
        <div className="flex flex-col gap-3 sm:flex-row [&>div]:flex-1">
          <FieldWrapper label={<Label.Root>เบอร์โทรศัพท์</Label.Root>}>
            <input
              type="text"
              {...register("phoneNumber")}
              className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>
          <FieldWrapper label={<Label.Root>อีเมล</Label.Root>}>
            <input
              type="email"
              disabled
              {...register("email")}
              className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>
        </div>
        <button
          type="submit"
          className="btn click-animation mt-4 self-start rounded border border-blue-500 bg-blue-50 px-12 text-blue-500"
        >
          แก้ไข
        </button>
      </form>
    </ProfileFormProvider>
  );
};

export default ProfileForm;
