import { Metadata } from "next";
import React from "react";
import LoginForm from "./components/LoginForm";
import { isUsingFakeUser } from "@/core/auth/nextAuth/authOptions";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ",
  description: "เข้าสู่ระบบรับสมัครผู้ช่วยสอน",
};

const LoginPage = () => {
  return (
    <div className="p-12">
      <LoginForm>
        <div>
          <h1 className="text-xl font-semibold text-blue-500">
            เข้าสู่ระบบ
            {isUsingFakeUser && (
              <p className="inline-block rounded-full bg-red-50 px-3 py-0.5 text-sm text-red-500 ml-2">กำลังใช้ระบบทดสอบ</p>
            )}
          </h1>
          <p className="mt-1 text-gray-500">เข้าสู่ระบบจัดการผู้ช่วยสอน</p>
        </div>
        <div>
          <label htmlFor="username" className="font-medium text-gray-900">
            ชื่อผู้ใช้
          </label>
          <input type="text" name="username" id="username" className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:shadow-sm w-full" />
        </div>
        <div>
          <label htmlFor="password" className="font-medium text-gray-900">
            รหัสผ่าน
          </label>
          <input type="password" name="password" id="password" className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:shadow-sm w-full" />
        </div>
        <button className="btn click-animation w-full bg-gradient-blue-purple text-white">เข้าสู่ระบบ</button>
      </LoginForm>
    </div>
  );
};

export default LoginPage;
