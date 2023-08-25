"use client";
import { useMemo } from "react";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import Link from "next/link";
import SuccessStepper from "./SuccessStepper";
import { twMerge } from "tailwind-merge";
import useGetSystemStatus from "@/core/hooks/systemStatus/useGetSystemStatus";

const CourseCard: React.FC<{
  course: FetchCourseType;
  children?: React.ReactNode;
  basicDataDisplay: { key: string; value: JSX.Element }[];
  href: string;
}> = ({ course, children, basicDataDisplay, href }) => {
  const systemStatus = useGetSystemStatus();
  const isSystemOpen = systemStatus.data?.data.data?.isOpen;
  const isBasicDetailCompleted = course?.isBasicDetailCompleted;
  const isApprovalFormCompleted = Boolean(course?.approvalForm);
  const isVerifyCompleted = course?.creationStatus === "ENROLLABLE";

  const courseStatus = useMemo(() => {
    if (!systemStatus.isSuccess) return "ไม่ทราบสถานะ";

    if (!isSystemOpen && isVerifyCompleted) {
      return "ระบบปิดรับสมัครอัตโนมัติ";
    }

    if (isVerifyCompleted) {
      return "เปิดรับสมัครอยู่";
    }
    
    return "ยังไม่ได้เปิดรับสมัคร";
  }, [isSystemOpen, systemStatus.isSuccess, isVerifyCompleted]);

  return (
    <div className="flex flex-col rounded border border-gray-300 bg-white p-4 hover:shadow-md">
      <div className="mb-4 flex items-center justify-start space-x-1">
        <div
          className={twMerge(
            "h-2 w-2 rounded-full bg-gray-500",
            courseStatus === "เปิดรับสมัครอยู่" && "animate-pulse bg-green-600",
            courseStatus === "ระบบปิดรับสมัครอัตโนมัติ" && "bg-amber-500"
          )}
        />
        <span
          className={twMerge(
            "text-xs text-gray-500",
            courseStatus === "เปิดรับสมัครอยู่" && "text-green-600",
            courseStatus === "ระบบปิดรับสมัครอัตโนมัติ" && "text-amber-500"
          )}
        >
          {courseStatus}
        </span>
      </div>
      <div className="[&>div]:pb-2">
        {basicDataDisplay.map((data) => (
          <div key={data.key}>
            <p className="text-xs text-gray-500">{data.key}</p>
            <div className="text-sm font-medium ">{data.value}</div>
          </div>
        ))}
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2 bg-gray-50 p-2">
        <SuccessStepper isCompleted={isBasicDetailCompleted}>กรอกรายละเอียดเบื้องต้นแล้ว</SuccessStepper>
        <SuccessStepper isCompleted={isApprovalFormCompleted}>เลือกประเภทวิชาแล้ว</SuccessStepper>
        <SuccessStepper isCompleted={isVerifyCompleted}>ตรวจสอบ และ ยืนยันแล้ว</SuccessStepper>
      </div>
      {children}
      <div className="mt-auto flex items-center justify-end space-x-2">
        <Link href={href}>
          <button className="btn click-animation active-on text-sm text-blue-500 hover:text-blue-700">
            รายละเอียด
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
