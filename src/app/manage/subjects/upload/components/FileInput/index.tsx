"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineXMark } from "react-icons/hi2";
// Components
import TableCourse from "../TableCourse";
import FileUploadComponet from "./FileUploadComponet";
// Custom hooks
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import useCreateCourse from "../../hook/useCreateCourse";

const FileInput = () => {
  const router = useRouter();
  const [fileFromUpload, setFileFromUpload] = useState<File | undefined>();
  const [fileObject ,setFileObject] = useState<Papa.ParseResult<Record<string, unknown>>>()
  {
    /* ย้ายไปใน Upload */
  }
  const { openToast } = useCustomToast();
  const createCourse = useCreateCourse();

  // Handle the uploaded file in the parent component
  const handleFileUpload = (file: File, resultdata:Papa.ParseResult<Record<string, unknown>>) => {
    setFileFromUpload(file);
    setFileObject(resultdata)
  };

  // submit hanlder
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileFromUpload) {
      const courses = fileObject?.data.map((data:Record<string, unknown>) => ({
        subjectId: data["รหัสวิชา"] as string,
        nameEng: data["ชื่อวิชาภาษาอังกฤษ"] as string,
        nameThai: data["ชื่อวิชาภาษาไทย"] as string,
        credit: data["หน่วยกิต"] as string,
        description: data["คำอธิบายรายวิชา"] as string,
        professorId: null,
      }));
      if(courses){
        createCourse.mutate(courses, {
          onSuccess: (data) => {
            openToast({
              title: <p className="text-blue-500">บันทึกวิชาสำเร็จ 🎉</p>,
              description: <p>อัพโหลดรายวิชาเรียบร้อย</p>,
              actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
            });
            router.push("/manage/subjects");
          },
          onError: (error) => {
            openToast({
              title: <p className="text-red-500">ไม่สามารถบันทึกรายวิชาได้</p>,
              description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
              actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
            });
            setFileFromUpload(undefined);
          },
        });
        } else {
        openToast({
          title: <p className="text-red-500">ไม่สามารถบันทึกรายวิชาได้</p>,
          description: <p>กรุณาเลือกไฟล์</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
        }
      }
      
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        {/* input  */}
        <FileUploadComponet onFileUpload={handleFileUpload} />
        {/* submit button */}
        <div className="mt-5 flex gap-4">
          <button
            type="button"
            onClick={() => setFileFromUpload(undefined)}
            className="click-animation btn border border-red-500 bg-red-50 text-xl text-red-500"
          >
            ลบ
          </button>
          <button
            type="submit"
            className="click-animation btn text-blue-white ml-auto mt-1 border border-blue-500 bg-blue-50 text-xl "
          >
            อัพโหลดรายวิชา
          </button>
        </div>
        {/* Table */}
        <h3 className="title mt-10 border-b pb-3 text-lg font-semibold text-stone-600">ตัวอย่างไฟล์</h3>
        <TableCourse fileFromUpload={fileFromUpload} fileObject={fileObject} />
      </form>
    </>
  );
};

export default FileInput;
