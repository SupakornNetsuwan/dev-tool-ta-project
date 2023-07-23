"use client";
import React from "react";
import LoadingLayout from "@/core/layouts/LoadingLayout";

const Loading = () => {
  return (
    <div className="relative flex h-[40vh] items-center">
      <LoadingLayout>กำลังโหลดหน้าเลือกประเภทวิชาที่เปิดรับสมัคร</LoadingLayout>
    </div>
  );
};

export default Loading;
