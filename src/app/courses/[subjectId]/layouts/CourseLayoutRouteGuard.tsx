"use client";
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import useCheckAuth from "@/core/hooks/useCheckAuth";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";

/**
 * @description สำหรับป้องกันการเข้าถึงวิชาที่ยังไม่ได้สร้าง + อนุญาตเฉพาะเจ้าของวิชา
 */

const CourseLayoutRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { subjectId } = useParams();
  const { data, isError, error, isSuccess } = useGetCourse(subjectId);
  const { session } = useCheckAuth(["PROFESSOR", "ADMIN"]);
  const courseDetail = useMemo(() => data?.data.data, [data]);

  useEffect(() => {
    if (!isSuccess) return;
    if (courseDetail?.creationStatus === "UNCREATED" || courseDetail?.professor?.id != session.data?.user.id) {
      redirect("/courses");
    }
  }, [courseDetail, isSuccess, session]);

  if (isError) throw error.response?.data.message;

  return <>{children}</>;
};

export default CourseLayoutRouteGuard;
