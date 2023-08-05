"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import useGetCourse from "@/core/hooks/courses/useGetCourse";

/**
 * @description สำหรับป้องกันการเข้าถึงหน้านี้ เมื่อวิชาดังกล่าวมีการเปิดให้ลงทะเบียนแล้ว
 */

const EnrollableCourseRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { subjectId } = useParams();
  const router = useRouter();
  const { data, isError, error } = useGetCourse(subjectId);
  const courseDetail = useMemo(() => data?.data.data, [data?.data.data]);

  useEffect(() => {
    if (courseDetail?.creationStatus === "ENROLLABLE") router.back();
  }, [courseDetail, router]);

  if (isError) throw error.response?.data.message;

  return <>{children}</>;
};

export default EnrollableCourseRouteGuard;
