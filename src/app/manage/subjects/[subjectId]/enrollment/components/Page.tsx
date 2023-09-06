"use client";
import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
// custom hook
import useGetEnroll from "@/core/hooks/enroll/useGetEnroll";
import LoadingSkeleton from "./LoadingSkeleton";
const TableStudentsEnroll = dynamic(() => import("./TableStudents"));

const DisplayStudents: React.FC = () => {
  const { subjectId } = useParams();
  const { data, isLoading, isError, error } = useGetEnroll(subjectId);

  if (isError) throw new Error(error.response?.data.message);
  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="rounded bg-white p-4">
      <TableStudentsEnroll enrolledStudents={data?.data.data || []} />
    </div>
  );
};

export default DisplayStudents;
