import React from "react";
import * as SubNavbar from "../../core/components/SubNavbar";
import { HiOutlineAcademicCap, HiOutlineUsers, HiOutlinePower } from "react-icons/hi2";
import Seperator from "../../core/components/SubNavbar/Seperator";
import checkAuth from "@/core/func/checkAuth";
import { redirect } from "next/navigation";

const layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const { hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN"]);
  if (!hasPermission) return redirect("/");

  return (
    <>
      <SubNavbar.Wrapper>
        <SubNavbar.Item path="/manage/subjects" icon={<HiOutlineAcademicCap />}>
          จัดการวิชาเรียน
        </SubNavbar.Item>
        <Seperator orientation="vertical" />
        <SubNavbar.Item path="/manage/users" icon={<HiOutlineUsers />}>
          จัดการผู้ใช้
        </SubNavbar.Item>
        <Seperator orientation="vertical" />
        <SubNavbar.Item path="/manage/status" icon={<HiOutlinePower />}>
          เปิด/ปิด การสมัคร
        </SubNavbar.Item>
      </SubNavbar.Wrapper>
      <div className="min-h-[80dvh] bg-gray-50 p-4">{children}</div>
    </>
  );
};

export default layout;
