"use client"
import React, { useMemo } from "react";
// custom hook
import useGetEnroll from "@/core/hooks/enroll/useGetEnroll";
import TableApprovalform from "../../../../../core/components/approvalForm/TableApprovalForm";
//type
import type { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";
//components
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";
import ExportCSVProvider from "../../../../../core/components/approvalForm/ExportCSVprovider";
const Page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  const getEnroll = useGetEnroll(subjectId);
  const enrolledStudents:ResponseGetEnrollsType = useMemo(() => getEnroll.data?.data.data || [], [getEnroll.data]);
  return (
    <>
      <GoBackBtn/>
      <p className="text-sx m-4 font-bold text-center">สรุปข้อมูลขออนุมัตินักศึกษาช่วยงาน(รายวิชา)</p>
      <PageWrapper className="max-w-6xl rounded">
        <ExportCSVProvider fileName={enrolledStudents[0]?.course?.nameEng?enrolledStudents[0]?.course?.nameEng:"ไม่มีข้อมูล"} enrolledStudents={enrolledStudents}>
          <TableApprovalform  enrolledStudents={enrolledStudents}></TableApprovalform>
        </ExportCSVProvider>
      </PageWrapper>
    </>
  );
};

export default Page;
