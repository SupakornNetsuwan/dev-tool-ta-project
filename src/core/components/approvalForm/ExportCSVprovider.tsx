"use client";
import { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";
// custom hook
import formatEnrolledData from "@/core/hooks/approvalForm/useFormatEnrolledData";
import useCreateCSVFile from "@/core/hooks/approvalForm/useCreateCSVFile";
import useExportCSVFile from "@/core/hooks/approvalForm/useExportCSVFive";
// type
import { ApprovalFormFormattedType } from "@/core/hooks/approvalForm/useFormatEnrolledData";
import React, { useEffect, useState } from "react";

interface ExportCSVProviderProps {
  enrolledStudents: ResponseGetEnrollsType;
  fileName: string | undefined;
  children: React.ReactNode;
}

const ExportCSVProvider: React.FC<ExportCSVProviderProps> = ({ children, enrolledStudents, fileName }) => {
  const [formattedEnrolledStudents, setFormattedEnrolledStudents] = useState<ApprovalFormFormattedType>();

  useEffect(() => {
    const enrolledStudentsFormatted = formatEnrolledData(enrolledStudents);
    setFormattedEnrolledStudents(enrolledStudentsFormatted);
  }, [enrolledStudents]);

  const handleExportCSV = () => {
    if (formattedEnrolledStudents) {
      const csvContent = useCreateCSVFile(formattedEnrolledStudents);
      useExportCSVFile(csvContent, `แบบฟอร์มขออนุมัติ${fileName}`);
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
              className="text-whute inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              type="button"
              onClick={handleExportCSV}
            >
              Export
            </button>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default ExportCSVProvider;
