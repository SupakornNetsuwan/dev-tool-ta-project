"use client";
import React, { useCallback, useMemo, useState } from "react";
import type { GetUsersType } from "@/app/api/manage/users/func/getUsers";
import * as Select from "@radix-ui/react-select";
import { DataGrid } from "@mui/x-data-grid";
import { HiOutlineChevronUp, HiOutlineChevronDown, HiOutlineChevronUpDown, HiOutlineCheck } from "react-icons/hi2";
import { Role } from "@prisma/client";

const SelectItem = React.forwardRef<HTMLDivElement, { children: React.ReactNode; value: string }>(
  ({ children, value, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={
          "relative flex h-[25px] select-none items-center rounded py-4 pl-6 pr-8 text-sm text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-50 data-[disabled]:text-gray-300 data-[highlighted]:text-gray-600 data-[highlighted]:outline-none"
        }
        value={value}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemIndicator asChild>
          <HiOutlineCheck className="absolute left-1 text-blue-500" />
        </Select.ItemIndicator>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  }
);

const DisplayUsers: React.FC<{ users: GetUsersType }> = ({ users: usersProp }) => {
  const [users, setUsers] = useState(usersProp);

  return (
    <div className="rounded-md bg-white p-4">
      <DataGrid
        sx={{ fontFamily: "Noto Sans Thai", color: "#6b7280" }}
        autoHeight
        disableRowSelectionOnClick
        localeText={{
          noRowsLabel: "ไม่มีข้อมูล 🍃",
          columnMenuLabel: "เมนู",
          columnMenuShowColumns: "แสดงคอลัมน์",
          columnMenuManageColumns: "จัดการคอลัมน์",
          columnMenuFilter: "ฟิลเตอร์",
          columnMenuHideColumn: "ซ่อนคอลัมน์",
          columnMenuUnsort: "ไม่เรียง",
          columnMenuSortAsc: "เรียงจากน้อยไปมาก",
          columnMenuSortDesc: "เรียงจากมากไปน้อย",
          footerRowSelected: (count) => `${count.toLocaleString()} แถวถูกเลือก`,
        }}
        rows={users}
        columns={[
          {
            field: "id",
            flex: 1,
            minWidth: 100,
            headerName: "ID",
            headerClassName: "text-blue-500",
            renderCell: (param) => {
              return (
                <p>
                  <span className="mr-1 text-blue-500">#</span>
                  {param.value}
                </p>
              );
            },
          },
          { field: "email", flex: 2, minWidth: 200, headerName: "อีเมล", headerClassName: "text-blue-500" },
          {
            field: "fullname",
            flex: 2,
            minWidth: 200,
            headerName: "ชื่อจริง-นามสกุล",
            headerClassName: "text-blue-500",
          },
          {
            field: "role",
            headerName: "Role",
            flex: 1,
            minWidth: 200,
            headerClassName: "text-blue-500",
            sortComparator: (v1, v2, param1, param2) => {
              return v1.localeCompare(v2);
            },
            valueGetter: (params) => params.value,
            renderCell: (body) => {
              const roles: Role[] = useMemo(() => ["ADMIN", "PROFESSOR", "SUPERADMIN", "STUDENT"], []);

              const setNewRole = useCallback(
                (newRole: Role) => {
                  if (newRole === body.value) return; // Role เดิม
                  if (!roles.includes(newRole)) return; // ไม่อยู่ในรายการ Role ที่มีอยู่
                  console.log("Make an API Request for updating role");

                  // then update the UI
                  setUsers((prevUsers) => {
                    return prevUsers.map((user) => {
                      return body.id === user.id ? { ...user, role: newRole } : user;
                    });
                  });
                },
                [body.value]
              );

              return (
                <Select.Root value={body.value} onValueChange={(newRole: Role) => setNewRole(newRole)}>
                  <Select.Trigger
                    className="flex w-32 items-center justify-between gap-1 rounded bg-white px-[15px] py-2 text-sm text-gray-500 shadow outline-none hover:shadow-realistic-1 focus:shadow-realistic-2"
                    aria-label="Role choosing"
                  >
                    <Select.Value placeholder="เลือก Role" aria-label="เลือก Role" />
                    <Select.Icon asChild>
                      <HiOutlineChevronUpDown className="text-lg text-blue-500" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                      <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white ">
                        <HiOutlineChevronUp className="text-gray-500" />
                      </Select.ScrollUpButton>
                      <Select.Viewport className="p-2">
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="PROFESSOR">Professor</SelectItem>
                        <Select.Separator className="m-[5px] h-px bg-gray-300" />
                        <SelectItem value="STUDENT">Student</SelectItem>
                      </Select.Viewport>
                      <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white">
                        <HiOutlineChevronDown className="text-gray-500" />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default DisplayUsers;
