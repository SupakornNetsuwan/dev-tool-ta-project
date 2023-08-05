"use client";
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";

/**
 * @description สำหรับป้องกันการเข้าถึงวิชาที่ยังไม่ได้สร้าง
 */

const UncreatedCourseRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { subjectId } = useParams();
  const { data, isError, error } = useGetCourse(subjectId);
  const courseDetail = useMemo(() => data?.data.data, [data]);

  useEffect(() => {
    if (courseDetail?.creationStatus === "UNCREATED") redirect("/courses");
  }, [courseDetail]);

  if (isError) throw error.response?.data.message;

  return <>{children}</>;
};

export default UncreatedCourseRouteGuard;
