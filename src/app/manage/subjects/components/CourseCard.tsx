"use client";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";

const CardCourse: React.FC<{ course: Course }> = ({ course }) => {
  const router = useRouter();

  const navigateToCourse = () => router.push(`/manage/subjects/${course.nameEng.replaceAll(" ", "-")}`);

  return (
    <>
      <div className="rounded border border-gray-300 bg-white p-4">
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
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={navigateToCourse}
            className="btn click-animation active-on text-sm text-blue-500 hover:text-blue-700"
          >
            รายละเอียด
          </button>
          {/* <button className="text-sm text-red-500 hover:text-red-700 ">ลบรายวิชา</button> */}
        </div>
      </div>
    </>
  );
};
export default CardCourse;
