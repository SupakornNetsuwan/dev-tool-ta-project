"use client";
import React, { useState, useEffect } from "react";
import CustomTabs from "./CustomTabs";
import SidebarToggler from "./SidebarToggler";
import { GTE_EIGHT, LT_EIGHT, REF_SCHEDULE, THEORY, PROJECTBASE, OTHER } from "./approvalForms";
import useGetCourseWithApproval from "@/core/hooks/courses/useGetCourseWithApproval";
import LoadingSekeleton from "./LoadingSekeleton";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

const CourseTypeChoosing: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const router = useRouter();
  const { status, data } = useGetCourseWithApproval(subjectId); // ทำการ fetch ข้อมูลมา และ เผื่อสำหรับ approvalForm ด้วย
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);
  const courseDetail = data?.data.data;
  const isHasAproovalForm = Boolean(courseDetail?.approvalForm);

  // ถ้าเกิดอยู่ใน State ที่เปิดลงทะเบียน ให้ redirect ออกไป
  useEffect(() => {
    if (courseDetail?.creationStatus === "ENROLLABLE") router.back();
  }, [courseDetail, router]);

  const closeSidebae = () => setIsSidebarToggle(false);
  const toggleSidebar = () => setIsSidebarToggle(!isSidebarToggle);

  if (status === "loading") return <LoadingSekeleton />;

  return (
    <>
      <SidebarToggler
        className={twMerge("ml-2 sm:hidden", isHasAproovalForm && "hidden")}
        onClick={toggleSidebar}
        isSidebarToggle={isSidebarToggle}
      />
      <CustomTabs.Root
        defaultValue={courseDetail?.approvalForm || "GTE_EIGHT"}
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
          <CustomTabs.Trigger value="OTHER">ปฏิบัติงานอื่น</CustomTabs.Trigger>
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
            value="GTE_EIGHT"
          >
            <GTE_EIGHT />
          </CustomTabs.Content>
          <CustomTabs.Content
            description="สำหรับรายรูปแบบที่น้อยกว่า 8 ชม./สัปดาห์"
            title="รายวิชาปฏิบัติการ"
            value="LT_EIGHT"
          >
            <LT_EIGHT />
          </CustomTabs.Content>
          <CustomTabs.Content
            description="สำหรับรายรูปแบบที่อิงตามหน้าตารางจริง"
            title="รายวิชาปฏิบัติการ"
            value="REF_SCHEDULE"
          >
            <REF_SCHEDULE />
          </CustomTabs.Content>
          <CustomTabs.Content title="รายวิชาทฤษฎี" value="THEORY">
            <THEORY />
          </CustomTabs.Content>
          <CustomTabs.Content title="วิชาทฤษฎีที่สอนแบบ Project base" value="PROJECTBASE">
            <PROJECTBASE />
          </CustomTabs.Content>
          <CustomTabs.Content title="ปฏิบัติงานอื่น" value="OTHER">
            <OTHER />
          </CustomTabs.Content>
        </CustomTabs.ContentContainer>
      </CustomTabs.Root>
    </>
  );
};

export default CourseTypeChoosing;
