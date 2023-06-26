"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { ResponseGetUsersType } from "@/app/api/manage/users/UsersType";
import { HiOutlineXMark } from "react-icons/hi2";
import type { Role } from "@prisma/client";
// Components
import RenderUserRole from "./RenderUserRole";
// Custom hooks
import useUpdateRole from "../hooks/useUpdateRole";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";

const roles: Role[] = ["ADMIN", "PROFESSOR", "SUPERADMIN", "STUDENT"];

const DisplayUsers: React.FC<{ users: ResponseGetUsersType }> = ({ users: usersProp }) => {
  const [users, setUsers] = useState(usersProp);
  const { openToast } = useCustomToast();
  const updateRole = useUpdateRole();

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
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "bg-gray-50" : "bg-white")}
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
              const setNewRole = (newRole: Role) => {
                if (newRole === body.value) return; // Role เดิม
                if (!roles.includes(newRole)) return; // ไม่อยู่ในรายการ Role ที่มีอยู่

                updateRole.mutate(
                  {
                    id: body.row.id,
                    role: newRole,
                  },
                  {
                    onSuccess(data, variables, context) {
                      openToast({
                        title: <p className="text-blue-500">แก้ไข Role สำเร็จ</p>,
                        description: <p>{data.data.message || "ไม่ทราบสาเหตุ"}</p>,
                        actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
                      });
                      // then update the UI
                      setUsers((prevUsers) => {
                        return prevUsers.map((user) => {
                          return body.id === user.id ? { ...user, role: newRole } : user;
                        });
                      });
                    },
                    onError(error, variables, context) {
                      openToast({
                        title: <p className="text-red-500">ไม่สามารถแก้ไขผู้ใช้งานได้</p>,
                        description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
                        actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
                      });
                    },
                    onSettled(data, error, variables, context) {
                      console.log(data?.data.message);
                    },
                  }
                );
              };

              return <RenderUserRole body={body} setNewRole={setNewRole} />;
            },
          },
        ]}
      />
    </div>
  );
};

export default DisplayUsers;
