import { DataGrid } from "@mui/x-data-grid";
import type { ResponseGetEnrollType } from "@/app/api/enrolls/[subjectId]/EnrollType";

const TableStudents: React.FC<{ enrolledStudents: ResponseGetEnrollType }> = ({ enrolledStudents }) => {
  return (
    <>
      <DataGrid
        sx={{ fontFamily: "Noto Sans Thai", color: "#6b7280" }}
        disableVirtualization
        autoHeight
        disableRowSelectionOnClick
        rows={enrolledStudents}
        getCellClassName={(row) => (row.value?.enrollStatus === "APPROVED" ? "bg-green-600" : "bg-grey-600")}
        getRowId={(rows) => rows.enrollId}
        columns={[
          {
            field: "sequence",
            headerName: "ลำดับ",
            headerClassName: "text-blue-500",
            renderCell: (index) => index.api.getAllRowIds(),
          },
          {
            field: "studentId",
            headerName: "รหัสนักศึกษา",
            flex: 1,
            minWidth: 100,
            headerClassName: "text-blue-500",
            renderCell: (param) => {
              return <p>{param.row.student?.id}</p>;
            },
          },
          {
            field: "fullname",
            headerName: "รหัสนักศึกษา",
            flex: 2,
            minWidth: 100,
            headerClassName: "text-blue-500",
            renderCell: (param) => {
              return <p>{param.row.student?.fullname}</p>;
            },
          },
          {
            field: "button",
            headerName: "แบบฟอร์มการสมัคร",
            flex: 2,
            minWidth: 100,
            headerClassName: "text-blue-500",
            renderCell: (param) => {
              return <p className="text-blue-800 underline">ตรวจสอบ</p>;
            },
          },
          {
            field: "enrollStatus",
            headerName: "สถานะการสมัคร",
            flex: 2,
            minWidth: 100,
            headerClassName: "text-blue-500",
            renderCell: (param) => {
              return (
                <p className={param.row.enrollStatus === "PENDING" ? "text-yellow-500" : "text-green-500"}>
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
