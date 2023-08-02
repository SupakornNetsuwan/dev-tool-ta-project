"use client";
import React from "react";
import dynamic from "next/dynamic";
// Components
const FieldWrapper = dynamic(() => import("../../../core/components/form/FieldWrapper"), {
  ssr: false,
  loading: () => <div className="h-6 w-full animate-pulse rounded bg-gray-200" />,
});
const ShowInputError = dynamic(() => import("../../../core/components/form/ShowInputError"), {
  loading: () => <div className="h-6 w-full animate-pulse rounded bg-gray-200" />,
});
const InputFile = dynamic(() => import("./InputFile"), {
  loading: () => <div className="h-6 w-full animate-pulse rounded bg-gray-200" />,
});
const FileSectionWrapper = dynamic(() => import("./FileSectionWrapper"), {
  loading: () => <div className="h-6 w-full animate-pulse rounded bg-gray-200" />,
});
const FormHeader = dynamic(() => import("./FormHeader"), { ssr: false });
import * as Label from "@radix-ui/react-label";
// React hook form
import { useFormContext } from "react-hook-form";
import type { ProfileFormType } from "../../api/users/[id]/profile/ProfileFormType";
import TitleSelector from "../../../core/components/form/TitleSelector";
import { useQueryClient } from "@tanstack/react-query";

const ProfileForm = () => {
  const { register, watch } = useFormContext<ProfileFormType>();
  const queryCleint = useQueryClient();
  const getProfile = queryCleint.getQueryState(["getProfile"]);

  console.log("Form state มีการเปลี่ยนแปลง 🏗️", watch());

  return (
    <>
      <FormHeader isLoading={getProfile?.status === "loading"} />
      <div className="flex flex-col gap-3 sm:flex-row [&>div]:flex-1">
        <FieldWrapper errorComponent={<ShowInputError inputName="title" />} label={<Label.Root>คำนำหน้า</Label.Root>}>
          <TitleSelector />
        </FieldWrapper>
        <FieldWrapper
          errorComponent={<ShowInputError inputName="firstname" />}
          label={<Label.Root>ชื่อจริง</Label.Root>}
        >
          <input
            type="text"
            {...register("firstname")}
            className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
        <FieldWrapper errorComponent={<ShowInputError inputName="lastname" />} label={<Label.Root>นามสกุล</Label.Root>}>
          <input
            type="text"
            {...register("lastname")}
            className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
        <FieldWrapper errorComponent={<ShowInputError inputName="id" />} label={<Label.Root>รหัสนักศึกษา</Label.Root>}>
          <input
            type="text"
            {...register("id", {
              disabled: true,
            })}
            className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
      </div>
      <FieldWrapper
        errorComponent={<ShowInputError inputName="address" />}
        label={<Label.Root>ที่อยู่ปัจจุบัน</Label.Root>}
      >
        <textarea
          rows={5}
          {...register("address")}
          className="w-full resize-none rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
        />
      </FieldWrapper>
      <div className="flex flex-col  gap-3 sm:flex-row [&>div]:flex-1">
        <FieldWrapper
          errorComponent={<ShowInputError inputName="phoneNumber" />}
          label={<Label.Root>เบอร์โทรศัพท์</Label.Root>}
        >
          <input
            type="text"
            {...register("phoneNumber")}
            className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
        <FieldWrapper errorComponent={<ShowInputError inputName="email" />} label={<Label.Root>อีเมล</Label.Root>}>
          <input
            type="email"
            disabled
            {...register("email")}
            className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row [&>div]:flex-1">
        <FieldWrapper
          errorComponent={<ShowInputError inputName="bookBankNumber" />}
          label={<Label.Root>เลขบัญชีธนาคาร</Label.Root>}
        >
          <input
            type="text"
            {...register("bookBankNumber")}
            className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
      </div>
      <FileSectionWrapper>
        <div className="flex flex-col gap-3 sm:flex-row [&>div]:flex-1">
          <FieldWrapper label={<Label.Root>สำเนาสมุดบัญชีธนาคาร</Label.Root>}>
            <InputFile
              label="สำเนาสมุดบัญชีธนาคาร"
              input={
                <input
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                  {...register("UserDocument.bookBankPath")}
                  className="w-full cursor-pointer rounded border bg-white p-2 text-sm text-gray-500 outline-none file:mr-4 file:cursor-pointer file:rounded file:border file:border-solid file:border-blue-500 file:bg-blue-50  file:px-4 file:py-2 file:text-sm file:text-gray-500 hover:shadow-realistic-2 disabled:opacity-50"
                />
              }
            />
          </FieldWrapper>
          <FieldWrapper label={<Label.Root>ตารางเรียนส่วนบุคคล</Label.Root>}>
            <InputFile
              label="ตารางเรียนส่วนบุคคล"
              input={
                <input
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                  {...register("UserDocument.classTablePath")}
                  className="w-full cursor-pointer rounded border bg-white p-2 text-sm text-gray-500 outline-none file:mr-4 file:cursor-pointer file:rounded file:border file:border-solid file:border-blue-500 file:bg-blue-50  file:px-4 file:py-2 file:text-sm file:text-gray-500 hover:shadow-realistic-2 disabled:opacity-50"
                />
              }
            />
          </FieldWrapper>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row [&>div]:flex-1">
          <FieldWrapper label={<Label.Root>สำเนาทรานสคริปปัจจุบัน</Label.Root>}>
            <InputFile
              label="สำเนาทรานสคริปปัจจุบัน"
              input={
                <input
                  type="file"
                  accept=".pdf"
                  {...register("UserDocument.transcriptPath")}
                  className="w-full cursor-pointer rounded border bg-white p-2 text-sm text-gray-500 outline-none file:mr-4 file:cursor-pointer file:rounded file:border file:border-solid file:border-blue-500 file:bg-blue-50  file:px-4 file:py-2 file:text-sm file:text-gray-500 hover:shadow-realistic-2 disabled:opacity-50"
                />
              }
            />
          </FieldWrapper>
          <FieldWrapper label={<Label.Root>รูปถ่ายขนาด 1 นิ้ว</Label.Root>}>
            <InputFile
              label="รูปถ่ายขนาด 1 นิ้ว"
              input={
                <input
                  accept="image/png,image/jpg,image/jpeg"
                  type="file"
                  {...register("UserDocument.picturePath")}
                  className="w-full cursor-pointer rounded border bg-white p-2 text-sm text-gray-500 outline-none file:mr-4 file:cursor-pointer file:rounded file:border file:border-solid file:border-blue-500 file:bg-blue-50  file:px-4 file:py-2 file:text-sm file:text-gray-500 hover:shadow-realistic-2 disabled:opacity-50"
                />
              }
            />
          </FieldWrapper>
        </div>
      </FileSectionWrapper>
      <button
        type="submit"
        className="btn click-animation self-start rounded border border-blue-500 bg-blue-50 px-12 text-blue-500"
      >
        แก้ไข
      </button>
    </>
  );
};

export default ProfileForm;
