"use client";
import { Course } from "@prisma/client";
import Link from "next/link";

const CardCourse: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <>
      <div className="border-slate-400 w-64 h-48  p-2 items-center justify-center border-2 drop-shadow-md ">
        <div className="h-36">
          <p className="mt-0 text-xs text-gray-500" color="text.secondary">
            ชื่อวิชา
          </p>
          <p  className="mb-1 text-sm">
            {course.nameEng}
          </p>
          <p className="mt-0 text-xs text-gray-500">
            รหัสวิชา
          </p>
          <p className="mb-1 text-sm">
            {course.subjectId}
          </p>
        </div>
        <div className="flex items-center justify-end">
          <Link href={`/manage/subjects/${course.nameEng.replaceAll(" ", "-")}`}>
            <button className="text-sm text-blue-500 hover:text-blue-700 mr-6">รายละเอียด</button>
          </Link>
          <button className="text-sm text-red-500 hover:text-red-700 " type="button">
            ลบรายวิชา
          </button>
        </div>
      </div>
    </>
  );
};
export default CardCourse;
