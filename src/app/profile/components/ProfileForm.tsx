"use client";
import React, { useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
// Components
const FieldWrapper = dynamic(() => import("./FieldWrapper"), {
  ssr: false,
  loading: () => <div className="h-6 w-full animate-pulse rounded bg-gray-200" />,
});
const ShowInputError = dynamic(() => import("./ShowInputError"), {
  loading: () => <div className="h-6 w-full animate-pulse rounded bg-gray-200" />,
});
const InputFile = dynamic(() => import("./InputFile"), {
  loading: () => <div className="h-6 w-full animate-pulse rounded bg-gray-200" />,
});
const FileSectionWrapper = dynamic(() => import("./FileSectionWrapper"), {
  loading: () => <div className="h-6 w-full animate-pulse rounded bg-gray-200" />,
});
import { HiOutlineXMark } from "react-icons/hi2";
import FormHeader from "./FormHeader";
import * as Label from "@radix-ui/react-label";
// Helper functions
import modifyUploadDocuments from "../func/modifyUploadDocuments";
// React query
import useGetProfile from "../hooks/useGetProfile";
import useUpdateProfile from "../hooks/useUpdateProfile";
// React hook form
import { SubmitHandler, useFormContext } from "react-hook-form";
import type { ProfileFormType } from "../types/ProfileFormType";
import TitleSelector from "./TitleSelector";
// Custom hooks
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import type { Session } from "next-auth";

const ProfileForm = ({ session }: { session: Session }) => {
  const { data, isSuccess, isLoading } = useGetProfile(session.user.id);

  const updateProfile = useUpdateProfile(session.user.id);
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProfileFormType>();
  const { openToast } = useCustomToast();

  const setFormValues = useCallback(
    (toUpdateFormValues: ProfileFormType) => {
      const { id, title, email, firstname, lastname, address, phoneNumber, UserDocument } = toUpdateFormValues;
      const { bookBankPath, classTablePath, picturePath, transcriptPath } = UserDocument || {};
      setValue("id", id);
      setValue("email", email);
      setValue("title", title || "นาย");
      setValue("firstname", firstname);
      setValue("lastname", lastname);
      setValue("address", address);
      setValue("phoneNumber", phoneNumber);
      setValue("UserDocument", {
        bookBankPath: bookBankPath || null,
        classTablePath: classTablePath || null,
        picturePath: picturePath || null,
        transcriptPath: transcriptPath || null,
      });
    },
    [setValue]
  );

  // console.log("Form state มีการเปลี่ยนแปลง 🏗️", watch());

  useEffect(() => {
    if (Object.values(errors).length > 0) console.log("⚠️", errors);
  }, [errors]);

  useEffect(() => {
    if (isSuccess) {
      if (!data.data.data) return console.log("ไม่มีข้อมูลที่ได้รับกลับมา");
      if (Object.entries(data.data.data).length === 0) return console.log("ข้อมูลที่ได้รับมาเป็น Object เปล่า");
      setFormValues(data.data.data);
    }
  }, [isSuccess, data?.data.data, setFormValues]);

  const submit: SubmitHandler<ProfileFormType> = (toUpdateData) => {
    toUpdateData.UserDocument = modifyUploadDocuments(toUpdateData.UserDocument); // ทำการปรับแต่ง payload files
    updateProfile.mutate(toUpdateData, {
      onSuccess(response) {
        openToast({
          title: <p className="text-blue-500">สำเร็จ 🎉</p>,
          description: <p>{response.data.message}</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
        setFormValues(response.data.data);
      },
      onError(error) {
        openToast({
          title: <p className="text-red-500">เกิดข้อผิดพลาด</p>,
          description: <p>{error.response?.data.message}</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
      },
    });
  };

  return (
    <>
      <FormHeader isLoading={isLoading} />
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
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
          <FieldWrapper
            errorComponent={<ShowInputError inputName="lastname" />}
            label={<Label.Root>นามสกุล</Label.Root>}
          >
            <input
              type="text"
              {...register("lastname")}
              className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>
          <FieldWrapper
            errorComponent={<ShowInputError inputName="id" />}
            label={<Label.Root>รหัสนักศึกษา</Label.Root>}
          >
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
          className="btn click-animation mt-4 self-start rounded border border-blue-500 bg-blue-50 px-12 text-blue-500"
        >
          แก้ไข
        </button>
      </form>
    </>
  );
};

export default ProfileForm;
