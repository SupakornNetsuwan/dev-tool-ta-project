import React from "react";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {

  return (
    <div className="p-12">
      <LoginForm>
        <div>
          <h1 className="text-xl font-semibold text-blue-500">เข้าสู่ระบบ</h1>
          <p className="mt-1 text-gray-500">เข้าสู่ระบบเพื่อลงสมัครผู้ช่วยสอน/จัดการ การลงทะเบียน</p>
        </div>
        <div>
          <label htmlFor="username" className="font-medium text-gray-900">
            ชื่อผู้ใช้
          </label>
          <input type="text" name="username" id="username" className="text-input w-full" />
        </div>
        <div>
          <label htmlFor="password" className="font-medium text-gray-900">
            รหัสผ่าน
          </label>
          <input type="text" name="password" id="password" className="text-input w-full" />
        </div>
        <button className="btn click-animation w-full bg-gradient-blue-purple text-white transition-shadow duration-100 hover:shadow-lg active:scale-95 ">
          เข้าสู่ระบบ
        </button>
      </LoginForm>
    </div>
  );
};

export default LoginPage;
