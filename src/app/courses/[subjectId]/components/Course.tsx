"use client";
import { useMemo } from "react";
import { usePathname, useParams } from "next/navigation";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
// Components
import CourseDropdown from "./CourseDropdown";
import LoadingSkeleton from "./LoadingSkeleton";
import List from "@/core/components/List";
import NavigateAction from "./NavigateAction";
// hook
import useGetCourse from "@/core/hooks/courses/useGetCourse";

const Course: React.FC = () => {
  const { subjectId } = useParams();
  const { data, isLoading } = useGetCourse(subjectId);
  const pathname = usePathname();
  const courseDetail = useMemo(() => data?.data.data, [data]);
  const isBasicDetailCompleted = courseDetail?.isBasicDetailCompleted;
  const isApprovalFormCompleted = Boolean(courseDetail?.approvalForm);
  const isVerifyCompleted = courseDetail?.creationStatus === "ENROLLABLE";

  if (isLoading) return <LoadingSkeleton />;

  const isCourseCompleted = isBasicDetailCompleted && isApprovalFormCompleted && isVerifyCompleted;

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
          {!isCourseCompleted && (
            <>
              <NavigateAction isCompleted={isBasicDetailCompleted} href={`${pathname}/detail`}>
                <span>รายละเอียดวิชาเบื้องต้น</span>
              </NavigateAction>
              <NavigateAction isCompleted={isApprovalFormCompleted} href={`${pathname}/type`}>
                <span>ประเภทวิชาที่เปิดรับสมัคร </span>
              </NavigateAction>
            </>
          )}
          <NavigateAction
            disabled={!isBasicDetailCompleted || !isApprovalFormCompleted}
            isCompleted={isVerifyCompleted}
            href={`${pathname}/verify`}
          >
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
