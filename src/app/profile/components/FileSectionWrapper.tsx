"use client"
import React from "react";

const FileSectionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mt-4 rounded-md bg-gradient-to-tl from-violet-500/50 to-gray-50  p-[2px]">
      <div className="flex flex-col space-y-4 rounded bg-gradient-to-bl from-gray-50 to-white p-6">
        <p className=" text-blue-500">ส่วนของไฟล์ และ เอกสารที่จำเป็น</p>
        {children}
      </div>
    </div>
  );
};

export default FileSectionWrapper;
