import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import Link from "next/link";
// Components
import SuccessStepper from "./SuccessStepper";

const CourseCard: React.FC<{ createdCourse: FetchCourseType }> = ({ createdCourse }) => {
  return (
    <div className="flex flex-col rounded border border-gray-300 bg-white p-4 hover:shadow-md">
      <div className="[&>div]:pb-2">
        <div>
          <p className="text-xs text-gray-500">ชื่อวิชา</p>
          <p className="text-sm font-medium text-blue-500">{createdCourse.nameEng}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">รหัสวิชา</p>
          <p className="text-sm">{createdCourse.subjectId}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">ผู้สอน</p>
          <p className="text-sm">
            {createdCourse.professor?.fullname || <span className="text-red-500">ยังไม่กำหนด</span>}
          </p>
        </div>
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2 bg-gray-50 p-2">
        <SuccessStepper isCompleted={createdCourse.isBasicDetailCompleted}>กรอกรายละเอียดเบื้องต้นแล้ว</SuccessStepper>
        <SuccessStepper isCompleted={false}>เลือกประเภทวิชาที่แล้ว</SuccessStepper>
        <SuccessStepper isCompleted={false}>ตรวจสอบ และ ยืนยันแล้ว</SuccessStepper>
      </div>
      <div className="mt-auto flex items-center justify-end space-x-2">
        <Link href={`/courses/${createdCourse.subjectId}`}>
          <button className="btn click-animation active-on text-sm text-blue-500 hover:text-blue-700">
            รายละเอียด
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
