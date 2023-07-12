"use client"
import React, { useEffect, useMemo, useState } from "react";
//
import { HiOutlineXMark } from "react-icons/hi2";
//type
import type { Course } from "@prisma/client"
import type { ResponseGetUsersType, ResponseGetUserType } from "@/app/api/manage/users/UsersType";
// components 
import SelectProfessorComponent from "./SelectProfessorComponent"
// custom hook
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import useGetUsers from "@/app/manage/users/hooks/useGetUsers";
import useUpdateCourse from "../hook/useUpdateCourse";
// query
import { useQueryClient } from "@tanstack/react-query";
const DetailCourseComponent: React.FC<{ course: Course}> = ({course}) =>{
    const { openToast } = useCustomToast();
    const updateProfessor = useUpdateCourse(course.subjectId)
    const getUsers = useGetUsers();
    const users = useMemo(() => getUsers.data?.data.data || [], [getUsers.data]);
    const [professorList, setProfessorList] = useState<ResponseGetUsersType>()
    // filter users role "professor"
    useEffect(()=>{
        const professors = users.filter(user => user.role === "PROFESSOR");
        setProfessorList(professors)
    }, [users])
    // ถ้า coures มีอาจารย์อยู่แล้ว
    const couresProfessor = (!course.professorId) ? undefined : course.professorId;
    const queryClient = useQueryClient();
    const setProfessor = (professorId: string) =>{
        updateProfessor.mutate(
            {
                professorId : professorId,
                subjectId :course.subjectId
            },
            {
                onSuccess(data, variables, context) {
                    openToast({ 
                      title: <p className="text-blue-500">แก้ไขอาจารย์สำเร็จ</p>,
                      description: <p>{data.data.message || "ไม่ทราบสาเหตุ"}</p>,
                      actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
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
                    // then update the UI
                    queryClient.invalidateQueries({ queryKey: ["getCourse"] });
                  },
            }
        )
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
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><SelectProfessorComponent body={professorList} setProfessor={setProfessor} selectedProfessor={couresProfessor} ></SelectProfessorComponent></dd>
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