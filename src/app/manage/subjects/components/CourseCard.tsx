import { Course } from "@prisma/client";
import Link from "next/link";

const CardCourse: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="flex flex-col rounded border border-gray-300 bg-white p-4">
      <div className="[&>div]:pb-2">
        <div>
          <p className="text-xs text-gray-500">ชื่อวิชา</p>
          <p className="text-sm">{course.nameEng}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">รหัสวิชา</p>
          <p className="text-sm">{course.subjectId}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-end space-x-2">
        <Link href={`/manage/subjects/${course.subjectId}`}>
          <button className="btn click-animation active-on text-sm text-blue-500 hover:text-blue-700">
            รายละเอียด
          </button>
        </Link>
      </div>
    </div>
  );
};
export default CardCourse;
