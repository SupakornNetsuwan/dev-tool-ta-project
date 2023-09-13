"use client";
import React, { useMemo } from "react";
// custom hook
import useGetEnroll from "@/core/hooks/enroll/useGetEnroll";
import TableApprovalform from "../../../../../core/components/approvalForm/TableApprovalForm";
//components
import ExportButton from "../../../../../core/components/approvalForm/ExportCSVComponent";
import { EnrollStatus } from "@prisma/client";
const Page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  const { data, isLoading } = useGetEnroll(subjectId, EnrollStatus.FINAL_APPROVED);
  const enrolledStudents = useMemo(() => data?.data.data || [], [data]);

  return (
    <div className=" bg-white p-4">
      <p className="text-lg font-medium text-blue-500">แบบฟอร์มขออนุมัติ (รายวิชา)</p>
      {enrolledStudents.length > 0 ? (
        <div className="my-4 flex flex-col">
          <TableApprovalform enrolledStudents={enrolledStudents} />
          <ExportButton
            className="btn click-animation my-4 ml-auto border border-blue-500 bg-blue-50 text-blue-500"
            enrolledStudents={enrolledStudents}
            fileName={`แบบฟอร์มขออนุมัติรายวิชา${enrolledStudents[0]?.course?.nameEng}`}
          />
        </div>
      ) : (
        <div className="flex h-44 flex-col items-center justify-center ">
          <p className="text-gray-800">ไม่มีข้อมูล</p>
          <p className="text-gray-500">ข้อมูลจะแสดงที่นี่ หากมีรายชื่อนักศึกษาที่สมัคร</p>
        </div>
      )}
    </div>
  );
};

export default Page;
