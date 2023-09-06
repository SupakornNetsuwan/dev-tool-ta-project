import { DataGrid } from "@mui/x-data-grid";
import type { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const TableStudents: React.FC<{ enrolledStudents: ResponseGetEnrollsType }> = ({ enrolledStudents }) => {
  return (
    <>
      <DataGrid
        sx={{ fontFamily: "Noto Sans Thai", color: "#6b7280" }}
        autoHeight
        disableRowSelectionOnClick
        density="compact"
        rows={enrolledStudents}
        getCellClassName={(row) => (row.value?.enrollStatus === "APPROVED" ? "bg-green-600" : "bg-grey-600")}
        getRowId={(row) => row.course?.subjectId + "_" + row.student?.id}
        columns={[
          {
            field: "studentId",
            headerName: "รหัสนักศึกษา",
            flex: 1,
            minWidth: 150,
            headerClassName: "text-blue-500",
            renderCell: (param) => {
              return <p>{param.row.student?.id}</p>;
            },
          },
          {
            field: "student.fullname",
            headerName: "ชื่อจริง-นามสกุล",
            flex: 2,
            minWidth: 225,
            headerClassName: "text-blue-500 text-center",
            valueGetter(params) {
              const profile = params.row.student?.Profile;
              return `${profile?.firstname} ${profile?.lastname}`;
            },
            renderCell(params) {
              return <div className="flex w-full overflow-x-auto">{params.value}</div>;
            },
          },
          {
            field: "enrollment-form",
            headerName: "แบบฟอร์มการสมัคร",
            flex: 2,
            minWidth: 150,
            headerClassName: "text-blue-500",
            renderCell() {
              return (
                <Link href={`/students/`}>
                  <p className="text-blue-800 underline">ตรวจสอบ</p>
                </Link>
              );
            },
          },
          {
            field: "enrollStatus",
            headerName: "สถานะการสมัคร",
            flex: 2,
            minWidth: 150,
            headerClassName: "text-blue-500",
            renderCell: (param) => {
              return (
                <p
                  className={twMerge(
                    param.row.enrollStatus === "PENDING" && "text-amber-500",
                    param.row.enrollStatus === "APPROVED" && "text-green-500"
                  )}
                >
                  {param.row.enrollStatus}
                </p>
              );
            },
          },
        ]}
      />
    </>
  );
};

export default TableStudents;
