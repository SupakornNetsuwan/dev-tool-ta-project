import React from "react";
// Components
import DisplayUsers from "./components/DisplayUsers";
// Prisma
import getUsers from "@/app/api/manage/users/func/getUsers";

const page: React.FC = async () => {
  const users = await getUsers();
 
  return (
    <div>
      <p className="mb-4 text-gray-500">จัดการผู้ใช้งาน และ Role ของผู้ใช้งานในระบบ</p>
      <DisplayUsers />
    </div>
  );
};

export default page;
