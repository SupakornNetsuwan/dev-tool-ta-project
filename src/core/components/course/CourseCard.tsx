import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import Link from "next/link";
import SuccessStepper from "./SuccessStepper";

const CourseCard: React.FC<{
  course: FetchCourseType;
  children?: React.ReactNode;
  basicDataDisplay: { key: string; value: JSX.Element }[];
  href: string;
}> = ({ course, children, basicDataDisplay, href }) => {
  return (
    <div className="flex flex-col rounded border border-gray-300 bg-white p-4 hover:shadow-md">
      <div className="[&>div]:pb-2">
        {basicDataDisplay.map((data) => (
          <div key={data.key}>
            <p className="text-xs text-gray-500">{data.key}</p>
            <p className="text-sm font-medium ">{data.value || <span className="text-red-500">ยังไม่มีข้อมูล</span>}</p>
          </div>
        ))}
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2 bg-gray-50 p-2">
        <SuccessStepper isCompleted={course.isBasicDetailCompleted}>กรอกรายละเอียดเบื้องต้นแล้ว</SuccessStepper>
        <SuccessStepper isCompleted={Boolean(course.approvalForm)}>เลือกประเภทวิชาแล้ว</SuccessStepper>
        <SuccessStepper isCompleted={false}>ตรวจสอบ และ ยืนยันแล้ว</SuccessStepper>
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
