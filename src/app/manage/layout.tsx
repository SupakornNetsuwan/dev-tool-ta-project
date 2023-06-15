import React from "react";
import SubNavbar from "./components/SubNavbar";
import { HiOutlinePlus, HiOutlineUsers, HiOutlinePower } from "react-icons/hi2";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <SubNavbar.Wrapper>
        <SubNavbar.Item path="/manage/subjects" icon={<HiOutlinePlus />}>
          จัดการวิชาเรียน
        </SubNavbar.Item>
        <SubNavbar.Item path="/manage/users" icon={<HiOutlineUsers />}>
          จัดการผู้ใช้
        </SubNavbar.Item>
        <SubNavbar.Item path="/manage/status" icon={<HiOutlinePower />}>
          เปิด/ปิด การสมัคร
        </SubNavbar.Item>
      </SubNavbar.Wrapper>
      {children}
    </>
  );
};

export default layout;
