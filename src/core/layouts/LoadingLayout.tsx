import React from "react";

/**
 *
 * @param children สำหรับระบุข้อความที่จะแสดงในหน้า loading
 * @description เป็น layout สำหรับแสดงหน้า loading
 */

const LoadingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
      <h2 className="text-center text-3xl font-semibold text-blue-500">โปรดรอสักครู่</h2>
      <div className="my-2 h-[1px] w-full bg-gray-300" />
      <div className="text-center text-gray-500">{children || <p>กำลังโหลดเว็บไซต์</p>}</div>
    </div>
  );
};

export default LoadingLayout;
