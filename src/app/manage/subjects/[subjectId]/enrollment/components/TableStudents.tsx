import { DataGrid } from "@mui/x-data-grid";
import type { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";
import Link from "next/link";
import RenderApprovalStatus from "./RenderApprovalStatus";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import { useQueryClient } from "@tanstack/react-query";
import { HiOutlineXMark } from "react-icons/hi2";
import useGetEnroll from "@/core/hooks/enroll/useGetEnroll";
import { useParams } from "next/navigation";
import useUpdateEnroll from "@/core/hooks/enroll/useUpdateEnroll";

const TableStudents: React.FC = () => {
  const { subjectId } = useParams();
  const enrollment = useGetEnroll(subjectId);
  const updateEnroll = useUpdateEnroll(subjectId);
  const { openToast } = useCustomToast();
  const queryClient = useQueryClient();
  const enrollmentData = enrollment.data?.data.data || [];

  return (
    <>
      <DataGrid
        sx={{ fontFamily: "Noto Sans Thai", color: "#6b7280" }}
        autoHeight
        disableRowSelectionOnClick
        disableColumnMenu
        rows={enrollmentData}
        getRowId={(row) => row.course?.subjectId + "_" + row.student?.id}
        slots={{
          noRowsOverlay: () => <div className="flex h-full items-center justify-center">ไม่มีข้อมูล</div>,
        }}
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
            renderCell: (body) => {
              const setApproval = (newApprovalStatus: ResponseGetEnrollsType[number]["enrollStatus"]) => {
                if (newApprovalStatus === body.value) return; // Role เดิม

                queryClient.setQueryData(["getEnroll", subjectId], (old: typeof enrollment.data) => {
                  if (!old) return old;

                  return {
                    ...old,
                    data: {
                      ...old.data,
                      data: [
                        ...old.data.data.map((enrollment) => {
                          if (enrollment.student?.id === body.row.student?.id) {
                            return { ...enrollment, enrollStatus: newApprovalStatus };
                          }
                          return enrollment;
                        }),
                      ],
                    },
                  };
                });

                updateEnroll.mutate(
                  { enrollStatus: newApprovalStatus, studentId: body.row.student?.id || "" },
                  {
                    onSuccess(data, variables, context) {
                      openToast({
                        title: <p className="text-blue-500">อัปเดตสำเร็จ</p>,
                        description: <p>{data.data.message || "ไม่ทราบสาเหตุ"}</p>,
                        actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
                      });
                    },
                    onError(error, variables, context) {
                      openToast({
                        title: <p className="text-red-500">ไม่สามารถอัปเดตได้</p>,
                        description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
                        actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
                      });
                    },
                    onSettled(data, error, variables, context) {
                      queryClient.invalidateQueries({ queryKey: ["getEnroll", subjectId] });
                    },
                  }
                );
              };

              return <RenderApprovalStatus body={body} setApproval={setApproval} />;
            },
          },
        ]}
      />
    </>
  );
};

export default TableStudents;
