"use client";
import React from "react";
import useGetFullCourseWithEnrollStatus from "@/core/hooks/studentView/useGetFullCourseWithEnrollStatus";
import { useParams } from "next/navigation";
import CourseDetail from "./CourseDetail";
import CoruseEnrollForm from "./CoruseEnrollForm";
import CourseEnrollFormProvider from "../providers/CourseEnrollFormProvider";
import ShowEnrollData from "./ShowEnrollData";

const Page = () => {
  const { subjectId } = useParams();
  const { data: courseDetail, isError, error } = useGetFullCourseWithEnrollStatus(subjectId);

  if (isError) {
    const message = error.response?.data.message;
    throw new Error(message);
  }

  return (
    <div className="mb-12 min-h-[80vh] rounded bg-gray-50 p-4">
      <CourseDetail />
      {courseDetail?.data.data.isEnrolled ? (
        <ShowEnrollData /> // แสดงข้อมูลการลงทะเบียน
      ) : (
        // แสดงฟอร์มลงทะเบียน
        <CourseEnrollFormProvider>
          <CoruseEnrollForm />
        </CourseEnrollFormProvider>
      )}
    </div>
  );
};

export default Page;
