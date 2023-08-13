"use client";
import React, { useMemo } from "react";
// custom hook
import useGetEnroll from "@/core/hooks/enroll/useGetEnroll";
import TableApprovalform from "../../../../../core/components/approvalForm/TableApprovalForm";
//components
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";
import ExportCSVComponent from "../../../../../core/components/approvalForm/ExportCSVComponent";

const Page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  const getEnroll = useGetEnroll(subjectId);
  const enrolledStudents = useMemo(() => getEnroll.data?.data.data || [], [getEnroll.data]);

  return (
    <>
      <GoBackBtn />
      <p className="text-sx m-4 text-center font-bold">สรุปข้อมูลขออนุมัตินักศึกษาช่วยงาน(รายวิชา)</p>
      <PageWrapper className="max-w-6xl rounded">
        {enrolledStudents.length > 0 && <ExportCSVComponent enrolledStudents={enrolledStudents} fileName={`แบบฟอร์มขออนุมัติรายวิชา${enrolledStudents[0]?.course?.nameEng}`}/>}
        {enrolledStudents.length === 0 && <p>ปุ่มดาวน์โหลดจะปรากฎขึ้นเมื่อมีข้อมูลนักศึกษา</p>}
        <TableApprovalform enrolledStudents={enrolledStudents} />
      </PageWrapper>
    </>
  );
};

export default Page;
