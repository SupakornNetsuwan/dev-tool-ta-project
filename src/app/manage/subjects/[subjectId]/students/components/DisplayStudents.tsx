"use client"
import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useSearchParams } from 'next/navigation'
// custom hook
import useGetStudentsEnroll from "../hooks/useGetStudentsEnroll";

const DisplayStudents: React.FC<{ subjectId: string }> = ({subjectId}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const getStudentsEnroll = useGetStudentsEnroll(subjectId)
    const studentsEnroll = useMemo(()=>getStudentsEnroll.data?.data.data|| [], [getStudentsEnroll.data])
    if (getStudentsEnroll.isLoading) {
        return (
          <div className="flex w-full animate-pulse flex-col space-y-4 rounded bg-white p-4 [&>div:nth-child(1)]:bg-blue-100 [&>div]:h-8 [&>div]:rounded-md [&>div]:bg-blue-50">
            {[...new Array(7)].map((_, index) => (
              <div key={index} />
            ))}
          </div>
        );
      }
    return(
        <>
         <button onClick={() => router.back()} className="mb-4 flex items-center space-x-1 text-blue-500">
            <HiOutlineArrowSmallLeft />
            <span>ย้อนกลับ</span>
             </button>
            <div className="rounded-md bg-white p-4">
             <p className="mb-4 text-gray-800">รายชื่อของผู้สมัครผู้ช่วยสอนในรายวิชา: {searchParams.get('courseDetail')}</p>
                <DataGrid
                    sx={{ fontFamily: "Noto Sans Thai", color: "#6b7280" }}
                    autoHeight
                    disableRowSelectionOnClick
                    rows={studentsEnroll}
                    getCellClassName={(row)=>row.value?.enrollStatus ==='APPROVED'? "bg-green-600":'bg-grey-600'}
                    getRowId={(rows)=>rows.enrollId}
                    columns={[
                        
                        {
                            field:"sequence",
                            headerName:"ลำดับ",
                            headerClassName: "text-blue-500",
                            renderCell:(index) => index.api.getAllRowIds()
                        },
                        {
                            field:"studentId",
                            headerName:"รหัสนักศึกษา",
                            flex:1,
                            minWidth:100,
                            headerClassName: "text-blue-500",
                            renderCell:(param)=>{
                                return(
                                    <p>{param.row.student?.id}</p>
                                )
                            }
                        },
                        {
                            field:"fullname",
                            headerName:"รหัสนักศึกษา",
                            flex:2,
                            minWidth:100,
                            headerClassName: "text-blue-500",
                            renderCell:(param)=>{
                                return(
                                    <p>{param.row.student?.fullname}</p>
                                )
                            }
                        },
                        {
                            field:"button",
                            headerName:"แบบฟอร์มการสมัคร",
                            flex:2,
                            minWidth:100,
                            headerClassName: "text-blue-500",
                            renderCell:(param)=>{
                                return(
                                    <p className="text-blue-800">ตรวจสอบ</p>
                                )
                            }
                        },
                        {
                            field:"enrollStatus",
                            headerName:"สถานะการสมัคร",
                            flex:2,
                            minWidth:100,
                            headerClassName: "text-blue-500",
                            renderCell:(param)=>{
                                return(
                                    <p className={param.row.enrollStatus === 'PENDING'? "text-yellow-500":"text-green-500"}>
                                        {param.row.enrollStatus}
                                    </p>
                                )
                            }
                        }
                    ]}
                />
            
            </div>
        </>
    )
}

export default DisplayStudents;