"use client";
import { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";
// custom hook
import formatEnrolledData from "@/core/hooks/approvalForm/useFormatEnrolledData";
import useCreateCsv from "@/core/hooks/approvalForm/useCreateCsv";
import ExportCsv from "@/core/hooks/approvalForm/func/ExportCsv";
// type
import { ApprovalFormFormattedType } from "@/core/hooks/approvalForm/useFormatEnrolledData";
import React, { HTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type ExportCSVProviderProps = {
  enrolledStudents: ResponseGetEnrollsType;
  fileName: string | undefined;
};

const ExportButton: React.FC<ExportCSVProviderProps & HTMLAttributes<HTMLButtonElement>> = ({
  enrolledStudents,
  fileName,
  ...props
}) => {
  const [formattedEnrolledStudents, setFormattedEnrolledStudents] = useState<ApprovalFormFormattedType>();

  useEffect(() => {
    const formattedEnrolledStudents = formatEnrolledData(enrolledStudents);
    setFormattedEnrolledStudents(formattedEnrolledStudents);
  }, [enrolledStudents]);

  const csvContent = useCreateCsv(formattedEnrolledStudents);

  const handleExportCSV = () => {
    if (csvContent) {
      ExportCsv(csvContent, `แบบฟอร์มขออนุมัติ${fileName}`);
    }
  };

  return (
    <button
      {...props}
      id="dropdownActionButton"
      data-dropdown-toggle="dropdownAction"
      className={twMerge("", props.className)}
      onClick={handleExportCSV}
    >
      นำข้อมูลออก
    </button>
  );
};

export default ExportButton;
