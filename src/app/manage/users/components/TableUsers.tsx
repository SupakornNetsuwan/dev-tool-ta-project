import React from "react";
import type { ResponseGetUsersType } from "@/app/api/manage/users/func/getUsers";

const Table: React.FC<{ users: ResponseGetUsersType; children: (users: ResponseGetUsersType) => React.ReactNode }> = ({
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
