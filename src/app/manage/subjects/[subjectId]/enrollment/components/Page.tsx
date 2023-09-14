"use client";
import React from "react";
import { useParams } from "next/navigation";
// custom hook
import useGetEnroll from "@/core/hooks/enroll/useGetEnroll";
import LoadingSkeleton from "./LoadingSkeleton";
import TableStudents from "./TableStudents";

const DisplayStudents: React.FC = () => {
  const { subjectId } = useParams();
  const { isLoading, isError, error } = useGetEnroll(subjectId);

  if (isError) throw new Error(error.response?.data.message);
  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className=" bg-white p-4">
      <p className="mb-4 text-lg font-medium text-blue-500">รายชื่อนักศึกษาที่ผ่านการคัดเลือก</p>
      <TableStudents />
    </div>
  );
};

export default DisplayStudents;
