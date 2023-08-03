"use client";
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";

const CourseRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { subjectId } = useParams();
  const { data, isError, error } = useGetCourse(subjectId);
  const course = useMemo(() => data?.data.data, [data]);

  useEffect(() => {
    if (course?.creationStatus === "UNCREATED") redirect("/courses");
  }, [course]);

  if (isError) throw error.response?.data.message;

  return <>{children}</>;
};

export default CourseRouteGuard;
