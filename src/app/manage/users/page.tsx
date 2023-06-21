import React from "react";
// Components
import DisplayUsers from "./components/DisplayUsers";
// Prisma
import getUsers from "@/app/api/manage/users/func/getUsers";

const page: React.FC = async () => {
  const users = await getUsers();
  
  return (
    <div>
      <p className="text-gray-500 mb-4">จัดการผู้ใช้งาน และ Role ของผู้ใช้งานในระบบ</p>
      <DisplayUsers users={users}/>
    </div>
  );
};

export default page;
