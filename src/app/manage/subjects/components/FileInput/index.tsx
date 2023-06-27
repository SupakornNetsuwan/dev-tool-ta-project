"use client"
import { Courses } from '@prisma/client';
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import { HiOutlineXMark } from "react-icons/hi2";
import useLoadingScreen from "@/core/components/LoadingScreen/hook/useLoadingScreen";
import React, { useState} from "react"
import TableCourse from "../TableCourse"
import FileUploadComponet from "./fileUploadComponet"
import { useRouter } from "next/navigation";
import { ParsData } from '../parseDataType';

import useCreateCourse from '../../hook/useCreateCourse';
const FileInput= () =>{
    const router = useRouter();
    const [fileFromUpload, setFileFromUpload] = useState<File | undefined>()
    const { openToast } = useCustomToast();
    const { showLoading, hideLoading } = useLoadingScreen();
    const [parsedData, setParsedData] = useState<ParsData[]>([]);
    const createCourse = useCreateCourse()

    // delete select folder
    const removeAll = () => {
        setFileFromUpload(undefined)
    }


    // Handle the uploaded file in the parent component
    const handleFileUpload = (file: File) => {
        setFileFromUpload(file)
    
    };
    const reciveParseData = (data:ParsData[]) =>{
        setParsedData(data)
    }
    // submit hanlder
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(parsedData.length > 0 && fileFromUpload){
            const courses: Courses[] = parsedData.map((data) => ({
                courseId : data["รหัสวิชา"],
                courseNameEng: data["ชื่อวิชาภาษาอังกฤษ"],
                courseNameThai: data["ชื่อวิชาภาษาไทย"],
                credit: data["หน่วยกิต"],
                courseDes: data["คำอธิบายรายวิชา"],
                professor: undefined,
                professorId: null
            }));
            showLoading();
            createCourse.mutate(
                courses,
                {
                    onSuccess: (data) => {
                        openToast({
                          title: <p className="text-blue-500">บันทึกวิชาสำเร็จ 🎉</p>,
                          description: <p>อัพโหลดรายวิชาเรียบร้อย</p>,
                          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
                        });
                        setTimeout(() => router.refresh(), 1000);
                        router.push("/manage/subjects")
                    },
                    onError: (error) => {
                        openToast({
                          title: <p className="text-red-500">ไม่สามารถบันทึกรายวิชาได้</p>,
                          description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
                          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
                        });
                    },
                    onSettled:()=>{
                        setTimeout(()=>hideLoading(),2000)
                        setFileFromUpload(undefined)
                        
                    }   
                }
            )
        }
        else{
            openToast({
                title: <p className="text-red-500">ไม่สามารถบันทึกรายวิชาได้</p>,
                description: <p>กรุณาเลือกไฟล์</p>,
                actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
            });
        }
    }
    return(
        <>
            <form onSubmit={submitHandler}>
                {/* input  */}
                <FileUploadComponet onFileUpload={handleFileUpload}></FileUploadComponet>
                {/* button submit */}
                <div className='flex gap-4 mt-5'>
                    <button
                        type='button'
                        onClick={removeAll}
                        className="click-animation btn border border-red-500 bg-red-50 text-red-500 text-xl"
                        
                    >
                        ลบ
                    </button>
                    <button
                        type='submit'
                        className='ml-auto mt-1 click-animation btn border bg-blue-50 border-blue-500 text-blue-white text-xl '
                    >
                        อัพโหลดรายวิชา
                    </button>
                </div>
                {/* Table */}
                <h3 className='title mt-10 border-b pb-3 text-lg font-semibold text-stone-600'>ตัวอย่างไฟล์</h3>
                    <TableCourse fileFromUpload={fileFromUpload} onParsedData={reciveParseData} ></TableCourse>
            </form>
        </>
    )
    }

export default FileInput