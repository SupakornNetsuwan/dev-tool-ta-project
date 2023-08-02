"use client";
import React from "react";
import LoadingLayout from "@/core/layouts/LoadingLayout";

const Loading = () => {
  return (
    <div className="relative flex h-[40vh] items-center">
      <LoadingLayout>กำลังโหลดหน้ายืนยันข้อมูล</LoadingLayout>
    </div>
  );
};

export default Loading;
