import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import Link from "next/link";
import SuccessStepper from "./SuccessStepper";
import { twMerge } from "tailwind-merge";

const CourseCard: React.FC<{
  course: FetchCourseType;
  children?: React.ReactNode;
  basicDataDisplay: { key: string; value: JSX.Element }[];
  href: string;
}> = ({ course, children, basicDataDisplay, href }) => {
  const isBasicDetailCompleted = course?.isBasicDetailCompleted;
  const isApprovalFormCompleted = Boolean(course?.approvalForm);
  const isVerifyCompleted = course?.creationStatus === "ENROLLABLE";

  return (
    <div className="flex flex-col rounded border border-gray-300 bg-white p-4 hover:shadow-md">
      <div className="mb-4 flex items-center justify-start space-x-1">
        <div
          className={twMerge("h-2 w-2 rounded-full bg-gray-500", isVerifyCompleted && "animate-pulse bg-green-600")}
        />
        <span className={twMerge("text-xs text-gray-500", isVerifyCompleted && "text-green-600")}>
          {isVerifyCompleted ? "เปิดรับสมัครอยู่" : "ยังไม่ได้เปิดรับสมัคร"}
        </span>
      </div>
      <div className="[&>div]:pb-2">
        {basicDataDisplay.map((data) => (
          <div key={data.key}>
            <p className="text-xs text-gray-500">{data.key}</p>
            <div className="text-sm font-medium ">
              {data.value || <span className="text-red-500">ยังไม่มีข้อมูล</span>}
            </div>
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
