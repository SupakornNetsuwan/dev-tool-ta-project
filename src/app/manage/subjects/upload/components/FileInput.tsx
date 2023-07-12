"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineXMark, HiOutlineArrowSmallLeft } from "react-icons/hi2";
// Components
import TableCourse from "./TableCourse";
import DropFileArea from "./DropFileArea";
// Custom hooks
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import useCreateCourse from "../hook/useCreateCourse";

const FileInput = () => {
  const router = useRouter();
  const { openToast } = useCustomToast();
  const createCourse = useCreateCourse();
  const [fileFromUpload, setFileFromUpload] = useState<File | undefined>();
  const [fileObject, setFileObject] = useState<Papa.ParseResult<Record<string, string>>>();

  // Handle the uploaded file in the parent component
  const fileUploadHandler = useCallback(
    (file: File, resultdata: Papa.ParseResult<Record<string, unknown>>) => {
      // เป็นการตรวจสอบว่าข้อมูลที่ให้มาในแต่ละ course นั้นตัว value จะเป็น string และ ไม่ว่างเปล่าแน่ ๆ
      const checkValidCourseData = resultdata.data.map((course) =>
        Object.values(course).every((value) => typeof value == "string" && value.length > 0)
      );

      if (checkValidCourseData.includes(false)) {
        openToast({
          title: <p className="text-red-500">ข้อมูลไม่ถูกต้อง</p>,
          description: <p>กรุณาตรวจสอบข้อมูลในไฟล์อีกครั้ง</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
        return;
      }

      setFileFromUpload(file);
      setFileObject(resultdata as Papa.ParseResult<Record<string, string>>);
    },
    [openToast]
  );

  const uploadNewCourses = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (fileFromUpload && fileObject?.data) {
      const courses = fileObject?.data.map((data) => ({
        subjectId: data["รหัสวิชา"] || "",
        nameEng: data["ชื่อวิชาภาษาอังกฤษ"] || "",
        nameThai: data["ชื่อวิชาภาษาไทย"] || "",
        credit: data["หน่วยกิต"] || "",
        description: data["คำอธิบายรายวิชา"] || "",
        professorId: null,
      }));

      if (courses) {
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
            setFileObject(undefined);
          },
        });
        return;
      }

      openToast({
        title: <p className="text-red-500">ไม่สามารถบันทึกรายวิชาได้</p>,
        description: <p>ข้อมูลฟิลด์ไม่สอดคล้องกันโปรดตรวจสอบ CSV</p>,
        actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
      });
    }

    openToast({
      title: <p className="text-red-500">ไม่สามารถบันทึกรายวิชาได้</p>,
      description: <p>กรุณาเลือกไฟล์</p>,
      actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
    });
  };

  return (
    <>
      <div>
        <button onClick={() => router.back()} className="mb-4 flex items-center space-x-1 text-blue-500">
          <HiOutlineArrowSmallLeft />
          <span>ย้อนกลับ</span>
        </button>
        <DropFileArea onFileUpload={fileUploadHandler} />
        <div className="mt-5 flex gap-4">
          {fileFromUpload && (
            <>
              <button
                onClick={() => setFileFromUpload(undefined)}
                className="click-animation btn border border-red-500 bg-red-50 text-red-500"
              >
                ลบ
              </button>
              <button
                onClick={uploadNewCourses}
                className="click-animation btn ml-auto bg-blue-500 text-white disabled:opacity-50"
              >
                อัพโหลดรายวิชา
              </button>
            </>
          )}
        </div>
        <TableCourse fileFromUpload={fileFromUpload} fileObject={fileObject} />
      </div>
    </>
  );
};

export default FileInput;