"use client";
import DetailCourseComponent from "./DetailCourseComponent";
import { useRouter } from "next/navigation";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
// hook
import useGetDetailCourse from "../hook/useGetDetailCourse";
import { useMemo } from "react";

const CourseDetail: React.FC<{ courseName: string }> = ({ courseName }) => {
  const { data, isLoading, isError, error } = useGetDetailCourse(courseName);
  const router = useRouter();

  if (isError) throw error.response?.data.message;

  if (isLoading)
    return (
      <>
        <div className="relative mt-5  flex  animate-pulse flex-col  overflow-hidden ">
          <div className="flex items-center justify-center">
            <div className="w-8/12 bg-blue-400  p-2 "></div>
          </div>
        </div>
      </>
    );

  const courseDetail = data.data.data;

  return (
    <>
      <button onClick={() => router.back()} className="mb-4 flex items-center space-x-1 text-blue-500">
        <HiOutlineArrowSmallLeft />
        <span>ย้อนกลับ</span>
      </button>
      <DetailCourseComponent course={courseDetail}></DetailCourseComponent>
      <div className="relative mt-5  flex  flex-col overflow-hidden  bg-gray-50 ">
        <div className="flex items-center justify-center">
          <div className="w-8/12 bg-white p-2 ">
            <p className="text-sx font-medium text-blue-500">การคัดเลือก</p>
            <dl className="divide-y ">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">สถานะการคัดเลือก</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">คัดเลือกเรียบร้อย</dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">รายชื่อนึกศึกษาที่ผ่านการคัดเลือก</dt>
                <dd className="mt-1 text-sm leading-6 text-blue-700 sm:col-span-2 sm:mt-0">ตรวจสอบรายชื่อ</dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">แบบฟอร์มขออนุมัตินักศึกษา(excel.)</dt>
                <dd className="mt-1 text-sm leading-6 text-blue-700 sm:col-span-2 sm:mt-0">ดาวน์โหลด</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseDetail;
