"use client"
import React, { useMemo } from "react";
// custom hook
import useGetEnroll from "@/core/hooks/enroll/useGetEnroll";
import TableApprovalform from "./components/TableApprovalForm";
import type { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";


const Page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  const getEnroll = useGetEnroll(subjectId);
  const enrolledStudents:ResponseGetEnrollsType = useMemo(() => getEnroll.data?.data.data || [], [getEnroll.data]);
  console.log(enrolledStudents)
  return (
    <>
      <p className="text-sx m-4 font-bold text-center">สรุปข้อมูลขออนุมัตินักศึกษาช่วยงาน(รายวิชา)</p>
      <TableApprovalform  enrolledStudents={enrolledStudents}></TableApprovalform>
    </>
  );
};

export default Page;
