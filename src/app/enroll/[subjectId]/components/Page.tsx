"use client";
import React from "react";
import useGetFullCourseWithEnrollStatus from "@/core/hooks/studentView/useGetFullCourseWithEnrollStatus";
import { redirect, useParams } from "next/navigation";
import CourseDetail from "./CourseDetail";
import CoruseEnrollForm from "./CoruseEnrollForm";
import CourseEnrollFormProvider from "../providers/CourseEnrollFormProvider";

const Page = () => {
  const { subjectId } = useParams();
  const { isError, error } = useGetFullCourseWithEnrollStatus(subjectId);

  if (isError) {
    const httpStatus = error.response?.status;
    const message = error.response?.data.message;
    if (httpStatus === 403) redirect("/enroll");

    throw new Error(message);
  }

  return (
    <div className="mb-12 min-h-[80vh] rounded bg-gray-50 p-4">
      <CourseDetail />
      <CourseEnrollFormProvider>
        <CoruseEnrollForm />
      </CourseEnrollFormProvider>
    </div>
  );
};

export default Page;
