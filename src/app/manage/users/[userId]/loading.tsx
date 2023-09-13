import React from "react";
import LoadingLayout from "@/core/layouts/LoadingLayout";

const Loading = () => {
  return (
    <div className="relative flex h-[40vh] items-center">
      <LoadingLayout>กำลังโหลดข้อมูลผู้ใช้</LoadingLayout>
    </div>
  );
};

export default Loading;
