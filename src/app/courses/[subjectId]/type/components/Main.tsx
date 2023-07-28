"use client";
import React, { useState } from "react";
import CustomTabs from "./CustomTabs";
import SidebarToggler from "./SidebarToggler";
import { GTE_EIGHT, LT_EIGHT, REF_SCHEDULE, THEORY } from "./approvalForms";
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import LoadingSekeleton from "./LoadingSekeleton";

const CourseTypeChoosing: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const { status, data } = useGetCourse(subjectId);
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);

  const closeSidebae = () => setIsSidebarToggle(false);
  const toggleSidebar = () => setIsSidebarToggle(!isSidebarToggle);

  if (status === "loading") return <LoadingSekeleton />;

  return (
    <>
      <SidebarToggler className="ml-2 sm:hidden" onClick={toggleSidebar} isSidebarToggle={isSidebarToggle} />
      <CustomTabs.Root defaultValue="GTE_EIGHT" className="relative grid-cols-12">
        <CustomTabs.List
          onClick={closeSidebae}
          className={`${
            isSidebarToggle ? "left-0" : "-left-[150%]"
          } absolute items-start divide-y border-r border-gray-100 shadow-realistic-2 duration-300 ease-out sm:static sm:col-span-6 sm:shadow-none md:col-span-4 `}
        >
          <CustomTabs.Trigger value="GTE_EIGHT">
            <div className="flex flex-col items-start">
              <p>รายวิชาปฏิบัติการ</p>
              <p className="text-sm text-gray-400">(ไม่น้อยกว่า 8 ชม./สัปดาห์)</p>
            </div>
          </CustomTabs.Trigger>
          <CustomTabs.Trigger value="LT_EIGHT">
            <div className="flex flex-col items-start">
              <p>รายวิชาปฏิบัติการ</p>
              <p className="text-sm text-gray-400">(น้อยกว่า 8 ชม./สัปดาห์)</p>
            </div>
          </CustomTabs.Trigger>
          <CustomTabs.Trigger value="REF_SCHEDULE">
            <div className="flex flex-col items-start">
              <p>รายวิชาปฏิบัติการ</p>
              <p className="text-sm text-gray-400">(ตามหน้าตารางจริง)</p>
            </div>
          </CustomTabs.Trigger>
          <CustomTabs.Trigger value="THEORY">รายวิชาทฤษฎี</CustomTabs.Trigger>
          <CustomTabs.Trigger value="PROJECTBASE">วิชาทฤษฎีที่สอนแบบ Project base</CustomTabs.Trigger>
          <CustomTabs.Trigger value="RESEARCH_HELPER">ผู้ช่วยนักวิจัยโครงการ</CustomTabs.Trigger>
          <CustomTabs.Trigger value="OTHERS">ปฏิบัติงานอื่น</CustomTabs.Trigger>
        </CustomTabs.List>
        <CustomTabs.ContentContainer
          className={`col-span-12 sm:col-span-6 md:col-span-8 ${
            isSidebarToggle ? "pointer-events-none translate-x-5 opacity-0" : ""
          } duration-200`}
        >
          <CustomTabs.Content title="รายวิชาปฏิบัติการ (ไม่น้อยกว่า 8 ชม./สัปดาห์)" value="GTE_EIGHT">
            <GTE_EIGHT />
          </CustomTabs.Content>
          <CustomTabs.Content title="รายวิชาปฏิบัติการ (น้อยกว่า 8 ชม./สัปดาห์)" value="LT_EIGHT">
            <LT_EIGHT />
          </CustomTabs.Content>
          <CustomTabs.Content title="รายวิชาปฏิบัติการ (ตามหน้าตารางจริง)" value="REF_SCHEDULE">
            <REF_SCHEDULE />
          </CustomTabs.Content>
          <CustomTabs.Content title="รายวิชาทฤษฎี" value="THEORY">
            <THEORY />
          </CustomTabs.Content>
          <CustomTabs.Content title="วิชาทฤษฎีที่สอนแบบ Project base" value="PROJECTBASE">x</CustomTabs.Content>
          <CustomTabs.Content title="ผู้ช่วยนักวิจัยโครงการ" value="RESEARCH_HELPER">y</CustomTabs.Content>
          <CustomTabs.Content title="ปฏิบัติงานอื่น" value="OTHERS">z</CustomTabs.Content>
        </CustomTabs.ContentContainer>
      </CustomTabs.Root>
    </>
  );
};

export default CourseTypeChoosing;
