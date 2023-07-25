"use client";
import React from "react";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const GoBackBtn = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="mb-4 flex items-center space-x-1 text-blue-500">
      <HiOutlineArrowSmallLeft />
      <span>ย้อนกลับ</span>
    </button>
  );
};

export default GoBackBtn;
