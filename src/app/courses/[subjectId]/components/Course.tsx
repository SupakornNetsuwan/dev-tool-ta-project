"use client";
import { useMemo } from "react";
import { usePathname, useParams, redirect } from "next/navigation";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import Link from "next/link";
// Components
import CourseDropdown from "./CourseDropdown";
import LoadingSkeleton from "./LoadingSkeleton";
import List from "@/core/components/List";
import CourseNotCompleted from "./actions/CourseNotCompleted";
import CourseCompleted from "./actions/CourseCompleted";
import SystemClosedCourseCompleted from "./actions/SystemClosedCourseCompleted";
// hook
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import useGetSystemStatus from "@/core/hooks/systemStatus/useGetSystemStatus";

const Course: React.FC = () => {
  const { subjectId } = useParams();
  const { data, isLoading } = useGetCourse(subjectId);
  const pathname = usePathname();
  const courseDetail = useMemo(() => data?.data.data, [data]);
  const systemStatus = useGetSystemStatus();
  const systemStatusData = systemStatus.data?.data.data;
  const isBasicDetailCompleted = courseDetail?.isBasicDetailCompleted;
  const isApprovalFormCompleted = Boolean(courseDetail?.approvalForm);
  const isVerifyCompleted = courseDetail?.creationStatus === "ENROLLABLE";

  if (isLoading || systemStatus.isLoading) return <LoadingSkeleton />;

  const isCourseCompleted = isBasicDetailCompleted && isApprovalFormCompleted && isVerifyCompleted;
  const isCourseCompletedAndSystemOpen = isCourseCompleted && systemStatusData?.isOpen;
  const isCourseCompletedAndSystemClosed = isCourseCompleted && !systemStatusData?.isOpen;

  if (systemStatusData?.isOpen === false && !isCourseCompleted) redirect("/courses");

  return (
    <>
      <CourseDropdown>
        <button className="ml-auto flex items-center space-x-1 rounded border bg-white px-3  py-1 text-gray-500 outline-none hover:bg-gray-50">
          <span>จัดการ</span>
          <HiMiniAdjustmentsHorizontal className="" />
        </button>
      </CourseDropdown>
      <div className="mt-4 bg-white p-4">
        <p className="pb-2 text-lg font-medium text-blue-500">กำหนดข้อมูลรายวิชา</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:h-24 md:grid-cols-3">
          {!isCourseCompleted && ( // เมื่อวิชายังไม่เสร็จ
            <CourseNotCompleted
              isApprovalFormCompleted={isApprovalFormCompleted}
              isBasicDetailCompleted={isBasicDetailCompleted}
              isVerifyCompleted={isVerifyCompleted}
            />
          )}

          {isCourseCompletedAndSystemOpen && ( // เมื่อระบบเปิดแล้ว และ วิชาเสร็จแล้ว
            <CourseCompleted
              isApprovalFormCompleted={isApprovalFormCompleted}
              isBasicDetailCompleted={isBasicDetailCompleted}
              isVerifyCompleted={isVerifyCompleted}
            />
          )}

          {isCourseCompletedAndSystemClosed && ( // เมื่อระบบปิดแล้ว และ วิชาเสร็จแล้ว
            <SystemClosedCourseCompleted />
          )}
        </div>
      </div>
      {isCourseCompletedAndSystemOpen && (
        <div className="mt-4 bg-white p-4">
          <p className="pb-2 text-lg font-medium text-blue-500">การคัดเลือก</p>
          <List.Wrapper>
            <List.Item topic="คัดเลือกนักศึกษา">
              <Link href={`${pathname}/enrollment`}>
                <p className="text-blue-600 underline">ไปคัดเลือก</p>
              </Link>
            </List.Item>
          </List.Wrapper>
        </div>
      )}
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
