"use client";
import React, { PropsWithChildren } from "react";
import type { GetUsersType } from "@/app/api/manage/users/func/getUsers";

const DisplayUsers: React.FC<{ users: GetUsersType }> = ({ users }) => {
  console.log(users);

  return <div className="rounded-md bg-white p-4">DisplayUsers</div>;
};

export default DisplayUsers;
