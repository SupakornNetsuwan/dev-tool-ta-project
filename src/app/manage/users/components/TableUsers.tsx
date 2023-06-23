import React from "react";
import type { GetUsersType } from "@/app/api/manage/users/func/getUsers";

const Table: React.FC<{ users: GetUsersType; children: (users: GetUsersType) => React.ReactNode }> = ({
  users,
  children,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>อีเมล</th>
          <th>ชื่อจริง-นามสกุล</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>{children(users)}</tbody>
    </table>
  );
};

export default {
  Table: Table,
};
