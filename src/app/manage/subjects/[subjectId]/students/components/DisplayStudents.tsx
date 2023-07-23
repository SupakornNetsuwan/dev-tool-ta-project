"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
// custom hook
import useGetEnroll from "../hooks/useGetEnroll";
const TableStudentsEnroll = dynamic(() => import("./TableStudents"));

const DisplayStudents: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getEnrolledStudents = useGetEnroll(subjectId);
  const enrolledStudents = useMemo(() => getEnrolledStudents.data?.data.data || [], [getEnrolledStudents.data]);

  if (getEnrolledStudents.isLoading) {
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
        <p className="mb-4 text-gray-800">รายชื่อของผู้สมัครผู้ช่วยสอนในรายวิชา: {searchParams.get("courseDetail")}</p>
        <TableStudentsEnroll enrolledStudents={enrolledStudents} />
      </div>
    </>
  );
};

export default DisplayStudents;
