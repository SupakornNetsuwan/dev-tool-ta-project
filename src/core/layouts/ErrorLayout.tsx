import React from "react";

/**
 * 
 * @param children สำหรับระบุข้อความที่จะแสดงในหน้า error
 * @description เป็น layout สำหรับแสดงหน้า error ในกรณีที่เกิด error ขึ้น
 */

const ErrorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-3xl font-semibold text-red-500 text-center">มีปัญหาบางอย่างเกิดขึ้น</h2>
      <div className="w-full h-[1px] bg-gray-300 my-2"/>
      <div className="text-center text-gray-500">{children || <p>ไม่สามารถระบุปัญหาได้</p>}</div>
    </div>
  );
};

export default ErrorLayout;
