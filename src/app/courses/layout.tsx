import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { HiOutlineSquares2X2, HiOutlinePresentationChartLine, HiOutlineArrowSmallRight } from "react-icons/hi2";
// Components
import * as SubNavbar from "@/core/components/SubNavbar";
import Seperator from "@/core/components/SubNavbar/Seperator";
// Functions
import dayjs, { Dayjs } from "dayjs";
import checkAuth from "@/core/func/checkAuth";
import getSystemStatus from "../api/systemStatus/func/getSystemStatus";
import "dayjs/locale/th";

dayjs.locale("th");

export const metadata: Metadata = {
  title: "จัดการคอร์สเรียน",
  description: "จัดการคอร์สเรียน สำหรับอาจารย์ประจำวิชา",
};

const DisplaySystemStatus: React.FC<{
  openDate: Dayjs;
  closeDate: Dayjs;
  isOpen: boolean;
  semester: number;
  year: number;
}> = async ({ openDate, closeDate, isOpen, semester, year }) => {
  return (
    <div className=" bg-white px-4 pb-4">
      <p className="pb-2 text-gray-500">
        ระยะเวลาที่ระบบเปิดรับสมัคร สำหรับ ปีการศึกษา {year} ภาคการศึกษา {semester}
      </p>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <div
          className={`${
            isOpen ? "text-blue-500" : "text-red-500"
          } flex min-h-[4em] flex-1 select-none items-center justify-center space-x-2 rounded border p-2 `}
        >
          <div>วัน{openDate.format("dddd")}</div>
          <div>{openDate.format("DD/MM/YYYY")}</div>
          <div>{openDate.format("HH:mm")}</div>
        </div>
        <HiOutlineArrowSmallRight className="rotate-90 self-center text-2xl text-gray-500 sm:rotate-0" />
        <div
          className={`${
            isOpen ? "text-blue-500" : "text-red-500"
          } flex min-h-[4em] flex-1 select-none items-center justify-center space-x-2 rounded border p-2 text-blue-500`}
        >
          <div>วัน{closeDate.format("dddd")}</div>
          <div>{closeDate.format("DD/MM/YYYY")}</div>
          <div>{closeDate.format("HH:mm")}</div>
        </div>
      </div>
    </div>
  );
};

const layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN", "PROFESSOR"]);
  if (!hasPermission) return redirect("/");
  const systemStatus = await getSystemStatus();

  if (!systemStatus)
    return (
      <div className="divide-x-2bg-white flex min-h-[60vh] items-center justify-center p-4 text-xl text-gray-500">
        ยังไม่มีกำหนดการรับสมัคร
      </div>
    );

  const { openDate, closeDate, semester, year, isOpen } = {
    ...systemStatus,
    openDate: dayjs(systemStatus.openDate),
    closeDate: dayjs(systemStatus.closeDate),
  };

  return (
    <>
      <SubNavbar.Wrapper>
        <SubNavbar.Item path="/courses" icon={<HiOutlineSquares2X2 />}>
          จัดการคอร์ส
        </SubNavbar.Item>
        <Seperator orientation="vertical" />
        <SubNavbar.Item path="/courses/dashboard" icon={<HiOutlinePresentationChartLine />}>
          ภาพรวม
        </SubNavbar.Item>
      </SubNavbar.Wrapper>
      <DisplaySystemStatus semester={semester} year={year} openDate={openDate} closeDate={closeDate} isOpen={isOpen} />
      <div className=" min-h-[80vh] bg-gray-50 p-4 ">{children}</div>
    </>
  );
};

export default layout;
