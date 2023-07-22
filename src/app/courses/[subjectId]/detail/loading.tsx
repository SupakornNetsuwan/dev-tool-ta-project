"use client";
import React from "react";
import LoadingLayout from "@/core/layouts/LoadingLayout";

const Loading = () => {
  return (
    <div className="relative flex h-[40vh] items-center">
      <LoadingLayout>กำลังโหลดหน้ารายละเอียดวิชาเบื้องต้น </LoadingLayout>
    </div>
  );
};

export default Loading;
