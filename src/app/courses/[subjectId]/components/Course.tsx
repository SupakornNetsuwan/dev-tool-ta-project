"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineArrowSmallLeft, HiOutlinePencil } from "react-icons/hi2";
// Components
import List from "./List";
import LoadingSkeleton from "./LoadingSkeleton";
// hook
import useGetDetailCourse from "@/app/manage/subjects/[subjectId]/hook/useGetDetailCourse";

const Course: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const { data, isLoading, isError, error } = useGetDetailCourse(subjectId);
  const router = useRouter();
  const courseDetail = useMemo(() => data?.data.data, [data]);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) throw error.response?.data.message;

  return (
    <>
      <button onClick={() => router.back()} className="mb-4 flex items-center space-x-1 text-blue-500">
        <HiOutlineArrowSmallLeft />
        <span>ย้อนกลับ</span>
      </button>
      <div className="mt-4 bg-white p-4">
        <p className="pb-2 text-lg font-medium text-blue-500">การคัดเลือก</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:h-24 md:grid-cols-4">
          <button className="flex items-center justify-center space-x-2 btn click-animation rounded-lg border bg-gray-50 px-12 py-4 ring-0 ring-blue-500 ring-offset-0 ring-offset-white duration-100 hover:border-blue-500 hover:ring-1 hover:ring-offset-2">
            <span>รายละเอียดวิชาผู้ส่งคำขอ</span>
            <HiOutlinePencil className="text-lg" />
          </button>
          <button className="flex items-center justify-center space-x-2 btn click-animation rounded-lg border bg-gray-50 px-12 py-4 ring-0 ring-blue-500 ring-offset-0 ring-offset-white duration-100 hover:border-blue-500 hover:ring-1 hover:ring-offset-2">
            <span>ประเภทวิชาที่ต้องการเปิดรับสมัคร</span>
            <HiOutlinePencil className="text-lg" />
          </button>
          <button className="flex items-center justify-center space-x-2 btn click-animation rounded-lg border bg-gray-50 px-12 py-4 ring-0 ring-blue-500 ring-offset-0 ring-offset-white duration-100 hover:border-blue-500 hover:ring-1 hover:ring-offset-2">
            <span>ตรวจสอบ และ ยืนยัน</span>
            <HiOutlinePencil className="text-lg" />
          </button>
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
