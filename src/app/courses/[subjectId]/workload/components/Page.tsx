"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { CourseWorkLoadModifyType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import { HiOutlineCheck } from "react-icons/hi2";
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

const Page = () => {
  const {
    register,
    formState: { isDirty },
  } = useFormContext<CourseWorkLoadModifyType>();
  const { subjectId } = useParams();
  const { data: courseDetail } = useGetCourse(subjectId);

  return (
    <div className=" flex flex-col bg-white p-4">
      <p className="text-lg font-medium text-blue-500">อัปโหลดไฟล์แบ่งภาระงาน</p>
      {courseDetail?.data.data.shareWorkloadFile && (
        <div className="flex items-center space-x-2 rounded bg-gradient-blue-purple p-4 text-white">
          <span>อัปโหลดไฟล์แบ่งภาระงานเรียบร้อยแล้ว</span> <HiOutlineCheck className="text-lg" />
        </div>
      )}
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        {...register("shareWorkloadFile")}
        className="my-4 w-full cursor-pointer rounded border bg-white p-2 text-sm text-gray-500 outline-none file:mr-4 file:cursor-pointer file:rounded file:border file:border-solid file:border-blue-500 file:bg-blue-50  file:px-4 file:py-2 file:text-sm file:text-gray-500 hover:shadow-realistic-2 disabled:opacity-50"
      />
      {courseDetail?.data.data.shareWorkloadFile && (
        <p className="text-sm text-gray-400">อัปโหลดไฟล์ใหม่ที่นี่ หากท่านต้องการแก้ไข</p>
      )}
      <button
        disabled={!isDirty}
        className={twMerge("btn click-animation ml-auto rounded bg-blue-500 px-6 py-2 text-white disabled:opacity-50")}
      >
        ยืนยัน
      </button>
    </div>
  );
};

export default Page;
