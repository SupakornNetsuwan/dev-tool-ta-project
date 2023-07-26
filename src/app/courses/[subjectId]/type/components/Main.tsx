"use client";
import React from "react";
import CustomTabs from "./CustomTabs";
import * as Tabs from "@radix-ui/react-tabs";
import SidebarToggler from "./SidebarToggler";
import { GTE_EIGHT, LT_EIGHT, REF_SCHEDULE, THEORY } from "../approvalForms";

const CourseTypeChoosing: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  return (
    <>
      <CustomTabs.Root defaultValue="GTE_EIGHT" className="relative grid-cols-12">
        <SidebarToggler onClick={() => console.log("x")} />
        <Tabs.List className="absolute -left-full col-span-6 items-start divide-y border-r border-gray-100 sm:static md:col-span-4">
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
        </Tabs.List>
        <Tabs.Content value="GTE_EIGHT">
          <GTE_EIGHT />
        </Tabs.Content>
        <Tabs.Content value="LT_EIGHT">
          <LT_EIGHT />
        </Tabs.Content>
        <Tabs.Content value="REF_SCHEDULE">
          <REF_SCHEDULE />
        </Tabs.Content>
        <Tabs.Content value="THEORY">
          <THEORY />
        </Tabs.Content>
      </CustomTabs.Root>
    </>
  );
};

export default CourseTypeChoosing;
