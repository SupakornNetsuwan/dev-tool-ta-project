import React from "react";
// Components
import DisplayUsers from "./components/DisplayUsers";
import GoBackBtn from "@/core/components/GoBackBtn";

const page: React.FC = async () => {
  return (
    <div>
      <p className="mb-4 text-gray-500">จัดการผู้ใช้งาน และ Role ของผู้ใช้งานในระบบ</p>
      <GoBackBtn/>
      <DisplayUsers />
    </div>
  );
};

export default page;
