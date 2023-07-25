"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import dynamic from "next/dynamic";
// custom hook
import useGetEnroll from "../hooks/useGetEnroll";
const TableStudentsEnroll = dynamic(() => import("./TableStudents"));

const DisplayStudents: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const router = useRouter();
  const getEnroll = useGetEnroll(subjectId);
  const enrolledStudents = useMemo(() => getEnroll.data?.data.data || [], [getEnroll.data]);

  if (getEnroll.isLoading) {
    return (
      <div className="flex w-full animate-pulse flex-col space-y-4 rounded bg-white p-4 [&>div:nth-child(1)]:bg-blue-100 [&>div]:h-8 [&>div]:rounded-md [&>div]:bg-blue-50">
        {[...new Array(7)].map((_, index) => (
          <div key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <button onClick={() => router.back()} className="mb-4 flex items-center space-x-1 text-blue-500">
        <HiOutlineArrowSmallLeft />
        <span>ย้อนกลับ</span>
      </button>
      <div className="rounded-md bg-white p-4">
        <p className="mb-4 text-center text-gray-800">รายชื่อของผู้สมัครผู้ช่วยสอน</p>
        <TableStudentsEnroll enrolledStudents={enrolledStudents} />
      </div>
    </>
  );
};

export default DisplayStudents;