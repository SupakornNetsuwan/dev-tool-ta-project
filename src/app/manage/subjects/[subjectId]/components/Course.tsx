"use client";
import { useMemo } from "react";
import Link from "next/link";
// Components
import List from "@/core/components/List";
import LoadingSkeleton from "./LoadingSkeleton";
import SelectProfessor from "./SelectProfessor";
import CourseDropdown from "./CourseDropdown";
import { HiMiniAdjustmentsHorizontal, HiMiniChevronRight } from "react-icons/hi2";
// hook
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import { useParams } from "next/navigation";

const Course: React.FC = () => {
  const { subjectId } = useParams();
  const { data, isLoading, isError, error } = useGetCourse(subjectId);
  const courseDetail = useMemo(() => data?.data.data, [data]);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) throw error.response?.data.message;

  return (
    <>
      <div>
        <CourseDropdown>
          <button className="ml-auto flex items-center space-x-1 rounded border bg-white px-3  py-1 text-gray-500 outline-none hover:bg-gray-50">
            <span>จัดการ</span>
            <HiMiniAdjustmentsHorizontal className="" />
          </button>
        </CourseDropdown>
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
            <SelectProfessor subjectId={subjectId} value={courseDetail?.professor?.id} />
          </List.Item>
        </List.Wrapper>
      </div>
      <div className="mt-4 bg-white p-4">
        <p className="pb-2 text-lg font-medium text-blue-500">การคัดเลือก</p>
        <List.Wrapper>
          <List.Item topic="รายชื่อนักศึกษาที่ผ่านการคัดเลือก">
            <Link href={`/manage/subjects/${subjectId}/enrollment`}>
              <p className="flex items-center text-blue-500">
                <span>ตรวจสอบรายชื่อ</span>
                <HiMiniChevronRight className="text-lg" />
              </p>
            </Link>
          </List.Item>
          <List.Item topic="แบบฟอร์มขออนุมัติ (รายวิชา)">
            <Link href={`/manage/subjects/${subjectId}/approvalform`}>
              <p className="flex items-center text-blue-500">
                <span>ตรวจสอบ</span>
                <HiMiniChevronRight className="text-lg" />
              </p>
            </Link>
          </List.Item>
          <List.Item topic="แบบฟอร์มแบ่งภาระงาน">
            {courseDetail?.shareWorkloadFile ? (
              <a
                target="_blank"
                className="flex items-center text-blue-500"
                href={`/api/file?path=${courseDetail.shareWorkloadFile}`}
                rel="noopener noreferrer"
              >
                <span>ดาวน์โหลด</span>
                <HiMiniChevronRight className="text-lg" />
              </a>
            ) : (
              <p className="text-gray-500">ยังไม่อัปโหลด</p>
            )}
          </List.Item>
        </List.Wrapper>
      </div>
    </>
  );
};
export default Course;
