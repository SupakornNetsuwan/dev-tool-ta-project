"use client";
import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
// React hook form
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import useUpdateProfile from "@/core/hooks/users/profile/useUpdateProfile";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import useGetProfile from "../../../core/hooks/users/profile/useGetProfile";
import type { ProfileFormType } from "../../api/users/[id]/profile/ProfileFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineXMark } from "react-icons/hi2";
// Helper functions
import modifyUploadDocuments from "../func/modifyUploadDocuments";
import type { Session } from "next-auth";
import profileFormSchema from "@/app/api/users/[id]/profile/func/profileFormSchema";

const ProfileFormProvider: React.FC<{ children: React.ReactNode; session: Session }> = ({ children, session }) => {
  const queryClient = useQueryClient()
  const updateProfile = useUpdateProfile(session.user.id);
  const { data } = useGetProfile(session.user.id);
  const { openToast } = useCustomToast();
  const userData = data?.data.data;

  const methods = useForm<ProfileFormType>({
    resolver: zodResolver(profileFormSchema),
    values: {
      id: userData?.id || session?.user.id,
      firstname: userData?.firstname || "",
      title: userData?.title || "นาย",
      address: userData?.address || "",
      email: userData?.email || session?.user.email,
      bankName: userData?.bankName || "ธนาคารกรุงไทย",
      degree: userData?.degree || "ปริญญาตรี",
      lastname: userData?.lastname || "",
      phoneNumber: userData?.phoneNumber || "",
      bookBankNumber: userData?.bookBankNumber || "",
      UserDocument: {
        bookBankPath: userData?.UserDocument?.bookBankPath || null,
        classTablePath: userData?.UserDocument?.classTablePath || null,
        picturePath: userData?.UserDocument?.picturePath || null,
        transcriptPath: userData?.UserDocument?.transcriptPath || null,
      },
    },
    defaultValues: {
      id: session?.user.id,
      firstname: "",
      title: "นาย",
      address: "",
      email: session?.user.email,
      bankName: "ธนาคารกรุงไทย",
      degree: "ปริญญาตรี",
      lastname: "",
      phoneNumber: "",
      bookBankNumber: "",
      UserDocument: {
        bookBankPath: null,
        classTablePath: null,
        picturePath: null,
        transcriptPath: null,
      },
    },
  });

  const submit: SubmitHandler<ProfileFormType> = (toUpdateData) => {
    toUpdateData.UserDocument = modifyUploadDocuments(toUpdateData.UserDocument); // ทำการปรับแต่ง payload files

    updateProfile.mutate(toUpdateData, {
      onSuccess(response) {
        openToast({
          title: <p className="text-blue-500">สำเร็จ 🎉</p>,
          description: <p>{response.data.message}</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
        queryClient.invalidateQueries(["getProfile"]);
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

  // console.log("Form state มีการเปลี่ยนแปลง 🏗️", methods.watch());

  useEffect(() => {
    if (Object.values(methods.formState.errors).length > 0) console.log("⚠️", methods.formState.errors);
  }, [methods.formState.errors]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} className="flex flex-col gap-3 pb-24">
        {children}
      </form>
    </FormProvider>
  );
};

export default ProfileFormProvider;
