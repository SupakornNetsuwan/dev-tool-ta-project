"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiOutlinePencil } from "react-icons/hi2";
import Link from "next/link";
// Components
import LoadingSkeleton from "./LoadingSkeleton";
import List from "./List";
import GoBackBtn from "@/core/components/GoBackBtn";
// hook
import useGetCourseDetail from "@/app/manage/subjects/[subjectId]/hook/useGetCourseDetail";

const Course: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const { data, isLoading, isError, error } = useGetCourseDetail(subjectId);
  const pathname = usePathname();
  const courseDetail = useMemo(() => data?.data.data, [data]);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) throw error.response?.data.message;

  return (
    <>
      <GoBackBtn />
      <div className="mt-4 bg-white p-4">
        <p className="pb-2 text-lg font-medium text-blue-500">การคัดเลือก</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:h-24 md:grid-cols-4">
          <Link
            href={`${pathname}/detail`}
            className="btn click-animation flex flex-col items-center justify-center space-x-2 rounded-lg border bg-gray-50 px-12 py-4 text-gray-500 ring-0 ring-blue-300 ring-offset-0 ring-offset-white duration-100 hover:border-blue-500 hover:bg-blue-50 hover:text-gray-800 hover:ring-1 hover:ring-offset-2"
          >
            <span>รายละเอียดวิชาเบื้องต้น</span>
            <HiOutlinePencil className="mt-1 text-lg" />
          </Link>
          <Link
            href={`${pathname}/type`}
            className="btn click-animation flex flex-col items-center justify-center space-x-2 rounded-lg border bg-gray-50 px-12 py-4 text-gray-500 ring-0 ring-blue-300 ring-offset-0 ring-offset-white duration-100 hover:border-blue-500 hover:bg-blue-50 hover:text-gray-800 hover:ring-1 hover:ring-offset-2"
          >
            <span>ประเภทวิชาที่เปิดรับสมัคร </span>
            <HiOutlinePencil className="mt-1 text-lg" />
          </Link>

          <Link
            href={`${pathname}/verify`}
            className="btn click-animation flex flex-col items-center justify-center space-x-2 rounded-lg border bg-gray-50 px-12 py-4 text-gray-500 ring-0 ring-blue-300 ring-offset-0 ring-offset-white duration-100 hover:border-blue-500 hover:bg-blue-50 hover:text-gray-800 hover:ring-1 hover:ring-offset-2"
          >
            <span>ตรวจสอบ และ ยืนยัน</span>
            <HiOutlinePencil className="mt-1 text-lg" />
          </Link>
        </div>
      </div>
      <div className="mt-4 bg-white p-4">
        <p className="pb-2 text-lg font-medium text-blue-500">รายละเอียดวิชา</p>
        <List.Wrapper>
          <List.Item topic="รหัสวิชา">
            <p className="text-gray-500">{courseDetail?.subjectId}</p>
          </List.Item>
          <List.Item topic="ชื่อวิชาภาษาอังกฤษ">
            <p className="text-gray-500">{courseDetail?.nameEng}</p>
          </List.Item>
          <List.Item topic="ชื่อวิชาภาษาไทย">
            <p className="text-gray-500">{courseDetail?.nameThai}</p>
          </List.Item>
          <List.Item topic="หน่วยกิต">
            <p className="text-gray-500">{courseDetail?.credit}</p>
          </List.Item>
          <List.Item topic="อาจารย์ผู้สอน">
            <p className="text-gray-500">{courseDetail?.professor?.id}</p>
          </List.Item>
          <List.Item topic="จำนวนนักศึกษาที่สมัคร">
            <p className="text-gray-500">{0}</p>
          </List.Item>
        </List.Wrapper>
      </div>
    </>
  );
};
export default Course;
