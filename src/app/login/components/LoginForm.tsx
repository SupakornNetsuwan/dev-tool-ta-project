"use client";
import React from "react";
import { signIn, SignInResponse } from "next-auth/react";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import { HiOutlineXMark } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import useLoadingScreen from "@/core/components/LoadingScreen/hook/useLoadingScreen";

const LoginForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openToast } = useCustomToast();
  const router = useRouter();
  const { showLoading, hideLoading } = useLoadingScreen();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    showLoading();

    signIn("tawebsite", {
      redirect: false,
      username: formProps.username,
      password: formProps.password,
      callbackUrl: "/",
    })
      .then((res: SignInResponse | undefined) => {
        if (typeof res === "undefined") throw "ไม่สามารถเข้าสู่ระบบได้เนื่องจากไม่มีการตอบกลับ"; // เผื่อว่าไม่มี res
        const { error } = res;
        if (error) throw error; // ถ้า error ให้โยนไปที่ catch จัดการ
        openToast({
          title: <p className="text-blue-500">เข้าสู่ระบบสำเร็จ 🎉</p>,
          description: <p>ยินดีต้อนรับ</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
        router.push("/");
      })
      .catch((err) => {
        console.log("🔴", err);
        if (err instanceof Error) err = err.message; // ปกติแล้วที่มันรับ error มาควรจะเป็น Error instance แต่ของ Nextuath ที่มันโยนมาแม้เราจะโยนเป็น Error instance แต่มันถูกปลี่ยนเป็น string เอง!?

        openToast({
          title: <p className="text-red-500">ไม่สามารถเข้าสู่ระบบได้</p>,
          description: <p>{err}</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
      })
      .finally(() => hideLoading());
  };

  return (
    <>
      <form onSubmit={submitHandler} className="mx-auto flex max-w-[25em] flex-col space-y-4">
        {children}
      </form>
    </>
  );
};

export default LoginForm;
