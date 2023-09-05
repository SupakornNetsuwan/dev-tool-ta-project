"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import useGetSystemStatus from "@/core/hooks/systemStatus/useGetSystemStatus";

/**
 * @description สำหรับป้องกันการเข้าถึงหน้านี้ เมื่อวิชาดังกล่าวมีการเปิดให้ลงทะเบียนแล้ว หรือ ระบบปิดการรับสมัครแล้ว
 */

const EnrollableCourseRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { subjectId } = useParams();
  const courseDetail = useGetCourse(subjectId);
  const systemStatus = useGetSystemStatus();
  const router = useRouter();
  const courseDetailData = useMemo(() => courseDetail.data?.data.data, [courseDetail.data?.data.data]);
  const systemStatusData = useMemo(() => systemStatus.data?.data.data, [systemStatus.data?.data.data]);

  useEffect(() => {
    if (courseDetailData?.creationStatus === "ENROLLABLE" || systemStatusData?.isOpen === false) router.back();
  }, [courseDetailData, router, systemStatusData]);

  if (courseDetail.isError) throw courseDetail.error;
  if (systemStatus.isError) throw systemStatus.error;

  return <>{children}</>;
};

export default EnrollableCourseRouteGuard;
