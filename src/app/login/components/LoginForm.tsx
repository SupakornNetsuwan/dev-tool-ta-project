"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import CustomToast from "@/core/components/CustomToast";
import useCustomToast from "@/core/components/CustomToast/useCustomToast";
import { HiOutlineXMark } from "react-icons/hi2";

const LoginForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast, setShowToast, openToast } = useCustomToast();
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
    });

    openToast();
  };

  return (
    <>
      <CustomToast
        showToast={showToast}
        setShowToast={setShowToast}
        title={<p className="text-red-500">ไม่สามารถเข้าสู่ระบบได้</p>}
        description={<p>โปรดลองใหม่อีกครั้ง</p>}
        actionButton={<HiOutlineXMark className="text-2xl text-gray-900" />}
      />
      <form onSubmit={submitHandler} className="mx-auto flex max-w-[25em] flex-col space-y-4">
        {children}
      </form>
    </>
  );
};

export default LoginForm;
