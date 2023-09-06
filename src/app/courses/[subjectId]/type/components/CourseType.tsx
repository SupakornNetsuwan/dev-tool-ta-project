"use client";
import React, { useState, useEffect } from "react";
import CustomTabs from "./CustomTabs";
import SidebarToggler from "./SidebarToggler";
import { PRACTICE, THEORY, PROJECTBASE } from "./approvalForms";
import useGetCourseWithApproval from "@/core/hooks/courses/useGetCourseWithApproval";
import LoadingSekeleton from "./LoadingSekeleton";
import { twMerge } from "tailwind-merge";

const CourseTypeChoosing: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const { status, data, error, isError } = useGetCourseWithApproval(subjectId); // ทำการ fetch ข้อมูลมา และ เผื่อสำหรับ approvalForm ด้วย
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);
  const courseDetail = data?.data.data;
  const isHasAproovalForm = Boolean(courseDetail?.approvalForm);

  const closeSidebae = () => setIsSidebarToggle(false);
  const toggleSidebar = () => setIsSidebarToggle(!isSidebarToggle);

  if (status === "loading") return <LoadingSekeleton />;
  if (isError) throw error;

  return (
    <>
      <SidebarToggler
        className={twMerge("ml-2 sm:hidden", isHasAproovalForm && "hidden")}
        onClick={toggleSidebar}
        isSidebarToggle={isSidebarToggle}
      />
      <CustomTabs.Root
        defaultValue={courseDetail?.approvalForm || "PRACTICE"}
        className="relative grid-cols-12 overflow-hidden"
      >
        <CustomTabs.List
          onClick={closeSidebae}
          className={twMerge(
            "absolute items-start divide-y border-r border-gray-100 shadow-realistic-2 duration-300 ease-out sm:static sm:col-span-6 sm:shadow-none md:col-span-4",
            isSidebarToggle ? "left-0" : "-left-[150%]",
            isHasAproovalForm && "hidden"
          )}
        >
          <CustomTabs.Trigger value="PRACTICE">รายวิชาปฏิบัติการ</CustomTabs.Trigger>
          <CustomTabs.Trigger value="THEORY">รายวิชาทฤษฎี</CustomTabs.Trigger>
          <CustomTabs.Trigger value="PROJECTBASE">วิชาทฤษฎีที่สอนแบบ Project base</CustomTabs.Trigger>
        </CustomTabs.List>
        <CustomTabs.ContentContainer
          className={twMerge(
            "col-span-12 h-full min-h-[80vh] duration-200 sm:col-span-6 md:col-span-8",
            isSidebarToggle && "pointer-events-none translate-x-5 opacity-0",
            isHasAproovalForm && "sm:col-span-12 md:col-span-12"
          )}
        >
          <CustomTabs.Content
            description="สำหรับรายรูปแบบที่ไม่น้อยกว่า 8 ชม./สัปดาห์"
            title="รายวิชาปฏิบัติการ"
            value="PRACTICE"
          >
            <PRACTICE />
          </CustomTabs.Content>
          <CustomTabs.Content title="รายวิชาทฤษฎีแบบทั่วไป" value="THEORY">
            <THEORY />
          </CustomTabs.Content>
          <CustomTabs.Content title="วิชาทฤษฎีที่สอนแบบ Project base" value="PROJECTBASE">
            <PROJECTBASE />
          </CustomTabs.Content>
        </CustomTabs.ContentContainer>
      </CustomTabs.Root>
    </>
  );
};

export default CourseTypeChoosing;
