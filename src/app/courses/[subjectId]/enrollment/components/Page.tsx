"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
// custom hook
import useGetEnroll from "@/core/hooks/enroll/useGetEnroll";
import LoadingSkeleton from "./LoadingSkeleton";
import TableStudents from "./TableStudents";
import useGetSystemStatus from "@/core/hooks/systemStatus/useGetSystemStatus";

const DisplayStudents: React.FC = () => {
  const { subjectId } = useParams();
  const { isLoading, isError, error } = useGetEnroll(subjectId);
  const router = useRouter();
  const { data: systemStatus } = useGetSystemStatus();

  useEffect(() => {
    if (!systemStatus?.data.data?.isOpen) router.back();
  }, [systemStatus?.data.data, router]);

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
