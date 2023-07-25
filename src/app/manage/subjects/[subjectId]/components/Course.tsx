"use client";
import { useMemo } from "react";
import GoBackBtn from "@/core/components/GoBackBtn";
import Link from "next/link";
// Components
import List from "./List";
import LoadingSkeleton from "./LoadingSkeleton";
import SelectProfessor from "./SelectProfessor";
// hook
import useGetCourse from "../../../../../core/hooks/courses/useGetCourse";

const Course: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const { data, isLoading, isError, error } = useGetCourse(subjectId);
  const courseDetail = useMemo(() => data?.data.data, [data]);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) throw error.response?.data.message;

  return (
    <>
      <GoBackBtn />
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
            <SelectProfessor subjectId={subjectId} value={courseDetail?.professor?.id} />
          </List.Item>
          <List.Item topic="จำนวนนักศึกษาที่สมัคร">
            <p className="text-gray-500">{0}</p>
          </List.Item>
        </List.Wrapper>
      </div>
      <div className="mt-4 bg-white p-4">
        <p className="pb-2 text-lg font-medium text-blue-500">การคัดเลือก</p>
        <List.Wrapper>
          <List.Item topic="สถานะการคัดเลือก">
            <p className="text-green-600">คัดเลือกเรียบร้อย</p>
          </List.Item>
          <List.Item topic="รายชื่อนึกศึกษาที่ผ่านการคัดเลือก">
            <Link href={`/manage/subjects/${subjectId}/enrollment`}>
              <p className="text-blue-600 underline">ตรวจสอบรายชื่อ</p>
            </Link>
          </List.Item>
          <List.Item topic="แบบฟอร์มขออนุมัติ(รายวิชา)">
            <Link href={`/manage/subjects/${subjectId}/approvalform`}>
              <p className="text-blue-600 underline">ตรวจสอบ</p>
            </Link>
          </List.Item>
        </List.Wrapper>
      </div>
    </>
  );
};
export default Course;
