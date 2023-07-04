"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
// Components
const FieldWrapper = dynamic(() => import("./FieldWrapper"), {
  ssr: false,
  loading: () => <div className="h-6 w-full animate-pulse rounded bg-gray-200" />,
});
import FileSectionWrapper from "./FileSectionWrapper";
import ProfileFormHeader from "./ProfileFormHeader";
import * as Label from "@radix-ui/react-label";
// React query
import useGetProfile from "../hooks/useGetProfile";
import useUpdateProfile from "../hooks/useUpdateProfile";
// React hooks form
import { useForm, SubmitHandler } from "react-hook-form";
import type { ProfileFormType } from "../types/ProfileFormType";
import TitleSelector from "./TitleSelector";
import ProfileFormProvider from "../providers/ProfileFormProvider";

const ProfileForm = () => {
  const { data, isSuccess, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const methods = useForm<ProfileFormType>({
    defaultValues: {
      id: "",
      firstname: "",
      title: "",
      address: "",
      email: "",
      lastname: "",
      phoneNumber: "",
      UserDocument: {
        bookBankPath: undefined,
        classTablePath: undefined,
        picturePath: undefined,
        transcriptPath: undefined,
      },
    },
  });
  const { handleSubmit, register, setValue } = methods;

  useEffect(() => {
    if (isSuccess) {
      const { id, title, email, firstname, lastname, address, phoneNumber } = data.data.data;
      setValue("title", title);
      setValue("email", email);
      setValue("id", id);
      setValue("firstname", firstname);
      setValue("lastname", lastname);
      setValue("address", address);
      setValue("phoneNumber", phoneNumber);
    }
  }, [isSuccess, data?.data.data, setValue]);

  const submit: SubmitHandler<ProfileFormType> = (toUpdateData) => {
    // console.log(toUpdateData);
    if (!toUpdateData.UserDocument) return;

    const newUserDocument = Object.fromEntries(
      Object.entries(toUpdateData.UserDocument).map(([key, file]) => [key, file[0]])
    ) as ProfileFormType["UserDocument"];

    toUpdateData.UserDocument = newUserDocument;
    updateProfile.mutate(toUpdateData, {
      onSuccess: (response) => {
        console.log(response.data.message);
      },
      onError: (error) => {
        console.log(error.response?.data.message);
      },
    });
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
        <FileSectionWrapper>
          <div className="flex flex-col gap-3 sm:flex-row [&>div]:flex-1">
            <FieldWrapper label={<Label.Root>สำเนาสมุดบัญชีธนาคาร</Label.Root>}>
              <input
                type="file"
                accept="image/*"
                {...register("UserDocument.bookBankPath")}
                className="w-full cursor-pointer rounded border bg-white p-2 text-sm text-gray-500 outline-none file:mr-4 file:cursor-pointer file:rounded file:border file:border-solid file:border-blue-500 file:bg-blue-50  file:px-4 file:py-2 file:text-sm file:text-gray-500 hover:shadow-realistic-2 disabled:opacity-50"
              />
            </FieldWrapper>
            <FieldWrapper label={<Label.Root>ตารางเรียนส่วนบุคคล</Label.Root>}>
              <input
                type="file"
                accept="image/*"
                {...register("UserDocument.classTablePath")}
                className="w-full cursor-pointer rounded border bg-white p-2 text-sm text-gray-500 outline-none file:mr-4 file:cursor-pointer file:rounded file:border file:border-solid file:border-blue-500 file:bg-blue-50  file:px-4 file:py-2 file:text-sm file:text-gray-500 hover:shadow-realistic-2 disabled:opacity-50"
              />
            </FieldWrapper>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row [&>div]:flex-1">
            <FieldWrapper label={<Label.Root>สำเนาทรานสคริปปัจจุบัน</Label.Root>}>
              <input
                type="file"
                accept=".pdf"
                {...register("UserDocument.transcriptPath")}
                className="w-full cursor-pointer rounded border bg-white p-2 text-sm text-gray-500 outline-none file:mr-4 file:cursor-pointer file:rounded file:border file:border-solid file:border-blue-500 file:bg-blue-50  file:px-4 file:py-2 file:text-sm file:text-gray-500 hover:shadow-realistic-2 disabled:opacity-50"
              />
            </FieldWrapper>
            <FieldWrapper label={<Label.Root>รูปถ่ายขนาด 1 นิ้ว</Label.Root>}>
              <input
                accept="image/*"
                type="file"
                {...register("UserDocument.picturePath")}
                className="w-full cursor-pointer rounded border bg-white p-2 text-sm text-gray-500 outline-none file:mr-4 file:cursor-pointer file:rounded file:border file:border-solid file:border-blue-500 file:bg-blue-50  file:px-4 file:py-2 file:text-sm file:text-gray-500 hover:shadow-realistic-2 disabled:opacity-50"
              />
            </FieldWrapper>
          </div>
        </FileSectionWrapper>
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
