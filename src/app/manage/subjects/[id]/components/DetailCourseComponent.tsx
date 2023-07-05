
import React, { useMemo } from "react";
import type { Course } from "@prisma/client"
// components 
import SelectProfessorComponent from "./SelectProfessorComponent"
// custom hook
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import useGetUsers from "@/app/manage/users/hooks/useGetUsers";

const DetailCourseComponent: React.FC<{ course: Course}> = ({course}) =>{
    const getUsers = useGetUsers();
    const users = useMemo(() => getUsers.data?.data.data || [], [getUsers.data]);
    const setProfessor = (ProfessorName: string) =>{
        console.log(ProfessorName)
    }
    return (
        <>
        <div className="relative flex  flex-col  overflow-hidden bg-gray-50  ">
            <div className="flex items-center justify-center" >
                <div className="w-8/12 bg-white p-2 ">
                    <p className="text-sx text-blue-500 font-medium">ข้อมูลรายวิชา</p>
                    <dl className="divide-y ">
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">รหัสวิชา</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{course.subjectId}</dd>
                        </div>
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">ชื่อวิชาภาษาอังกฤษ</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{course.nameEng}</dd>
                        </div>
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">ชื่อวิชาภาษาไทย</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{course.nameThai}</dd>
                        </div>
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">หน่วยกิต</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{course.credit}</dd>
                        </div>
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">อาจารย์ผู้สอน</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><SelectProfessorComponent body={users} setProfessor={setProfessor}></SelectProfessorComponent></dd>
                        </div>
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-80 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">จำนวนนักศึกษาที่สมัคร</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        </>
    )
}
export default  DetailCourseComponent