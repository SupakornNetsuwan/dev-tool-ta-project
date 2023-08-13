"use client";
import { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";
// custom hook
import formatEnrolledData from "@/core/hooks/approvalForm/useFormatEnrolledData";
import useCreateCsv from "@/core/hooks/approvalForm/useCreateCsv";
import ExportCsv from "@/core/hooks/approvalForm/func/ExportCsv";
// type
import { ApprovalFormFormattedType } from "@/core/hooks/approvalForm/useFormatEnrolledData";
import React, { useEffect, useState } from "react";

interface ExportCSVProviderProps {
  enrolledStudents: ResponseGetEnrollsType;
  fileName: string | undefined;
}

const ExportCSVComponent: React.FC<ExportCSVProviderProps> = ({enrolledStudents, fileName }) => {
  const [formattedEnrolledStudents, setFormattedEnrolledStudents] = useState<ApprovalFormFormattedType>();

  useEffect(() => {
    const enrolledStudentsFormatted = formatEnrolledData(enrolledStudents);
    setFormattedEnrolledStudents(enrolledStudentsFormatted);
  }, [enrolledStudents]);
    const csvContent = useCreateCsv(formattedEnrolledStudents)


  const handleExportCSV = () => {
    if (csvContent) {
        ExportCsv(csvContent, `แบบฟอร์มขออนุมัติ${fileName}`)
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-end justify-end bg-white p-4 dark:bg-gray-700 ">
          <div className="">
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className=" inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium"
              onClick={handleExportCSV}
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportCSVComponent;
