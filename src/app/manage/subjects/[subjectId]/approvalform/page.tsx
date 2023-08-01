"use client"
import React, { useMemo } from "react";
// custom hook
import useGetEnroll from "@/core/hooks/enroll/useGetEnroll";
import TableApprovalform from "./components/TableApprovalForm";
import type { ResponseGetEnrollType } from "@/app/api/enrolls/[subjectId]/EnrollType";


const page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  const getEnroll = useGetEnroll(subjectId);
  const enrolledStudents = useMemo(() => getEnroll.data?.data.data || [], [getEnroll.data]);
  console.log(enrolledStudents);

  return (
    <>
      <div>แบบฟอร์มขออนุมัติ</div>
      <TableApprovalform enrolledStudents={enrolledStudents}></TableApprovalform>
    </>
  );
};

export default page;
