"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
// Components
import LoadingSkeleton from "./LoadingSkeleton";
import List from "./List";
import NavigateAction from "./NavigateAction";
// hook
import useGetCourse from "@/app/manage/subjects/[subjectId]/hook/useGetCourse";

const Course: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const { data, isLoading, isError, error } = useGetCourse(subjectId);
  const pathname = usePathname();
  const courseDetail = useMemo(() => data?.data.data, [data]);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) throw error.response?.data.message;

  return (
    <>
      <div className="mt-4 bg-white p-4">
        <p className="pb-2 text-lg font-medium text-blue-500">กำหนดข้อมูลรายวิชา</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:h-24 md:grid-cols-3">
          <NavigateAction isCompleted={courseDetail?.isBasicDetailCompleted} href={`${pathname}/detail`}>
            <span>รายละเอียดวิชาเบื้องต้น</span>
          </NavigateAction>
          <NavigateAction isCompleted={false} href={`${pathname}/type`}>
            <span>ประเภทวิชาที่เปิดรับสมัคร </span>
          </NavigateAction>
          <NavigateAction isCompleted={false} href={`${pathname}/verify`}>
            <span>ตรวจสอบ และ ยืนยัน</span>
          </NavigateAction>
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
