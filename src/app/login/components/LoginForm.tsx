"use client";
import React, { useState } from "react";
import { useSession, signIn, SignInResponse } from "next-auth/react";
import CustomToast from "@/core/components/CustomToast";
import useCustomToast from "@/core/components/CustomToast/useCustomToast";
import { HiOutlineXMark } from "react-icons/hi2";

const LoginForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toastState, setIsShowToast, openToast } = useCustomToast();
  const session = useSession();

  React.useEffect(() => {
    console.log(session);
  }, [session]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);

    signIn("tawebsite", {
      redirect: false,
      username: formProps.username,
      password: formProps.password,
      callbackUrl: "/",
    })
      .then((res: SignInResponse | undefined) => {
        if (typeof res === "undefined") throw "ไม่สามารถเข้าสู่ระบบได้เนื่องจากไม่มีการตอบกลับ"; // เผื่อว่าไม่มี res
        const { error } = res;
        if (error) throw error;
        openToast({
          title: <p className="text-blue-500">เข้าสู่ระบบสำเร็จ 🎉</p>,
          description: <p>ยินดีต้อนรับ</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
      })
      .catch((err) => {
        console.log("🔴", err);
        openToast({
          title: <p className="text-red-500">ไม่สามารถเข้าสู่ระบบได้</p>,
          description: <p>{err}</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
      });
  };

  return (
    <>
      <CustomToast
        setShowToast={setIsShowToast}
        showToast={toastState.showToast}
        title={toastState.title}
        description={toastState.description}
        actionButton={toastState.actionButton}
      />
      <form onSubmit={submitHandler} className="mx-auto flex max-w-[25em] flex-col space-y-4">
        {children}
      </form>
    </>
  );
};

export default LoginForm;
