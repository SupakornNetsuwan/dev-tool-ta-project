import React from "react";

/**
 *
 * @param children สำหรับระบุข้อความที่จะแสดงในหน้า error
 * @description เป็น layout สำหรับแสดงหน้า error ในกรณีที่เกิด error ขึ้น
 */

const ErrorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mx-auto flex min-h-[50dvh] w-full max-w-[30em] flex-col items-center justify-center">
      <h2 className="text-center text-3xl font-semibold text-red-500">มีปัญหาบางอย่างเกิดขึ้น</h2>
      <div className="my-2 h-[1px] w-full bg-gray-300" />
      <div className="text-center text-gray-500">{children || <p>ไม่สามารถระบุปัญหาได้</p>}</div>
    </div>
  );
};

export default ErrorLayout;
