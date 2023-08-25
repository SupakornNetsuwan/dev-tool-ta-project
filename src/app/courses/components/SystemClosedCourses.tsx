"use client";
import React from "react";
// Components
import CourseListWrapper from "@/core/components/course/CourseListWrapper";
import CourseCard from "../../../core/components/course/CourseCard";
import LoadingSkeleton from "./LoadingSkeleton";
// Hooks
import useGetCourseByProfessor from "@/core/hooks/courses/useGetCourseByProfessor";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const SystemClosedCourses: React.FC<{ professorId: string }> = ({ professorId }) => {
  const { data, isLoading, isError, error } = useGetCourseByProfessor(professorId);
  const courses = data?.data.data;

  if (isError) throw error;
  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
      <div className="mb-4 rounded bg-gradient-to-tr from-gray-100 to-gray-50/10 p-4">
        <p className="text-gray-500 [text-wrap:balance]">
          ระบบปิดรับสมัครแล้ว คุณจะสามารถเข้าถึงได้เฉพาะวิชาที่คุณได้เปิดรับสมัครไปในช่วงที่มีการเปิดรับสมัคร
        </p>
      </div>
      <CourseListWrapper>
        {courses
          ?.filter((course) => course.creationStatus === "ENROLLABLE")
          ?.map((course: FetchCourseType, index) => (
            <CourseCard
              key={index}
              course={course}
              href={`/courses/${course.subjectId}`}
              basicDataDisplay={[
                {
                  key: "ชื่อวิชา",
                  value: <span className="font-semibold text-gray-800 ">{course.nameEng}</span>,
                },
                {
                  key: "รหัสวิชา",
                  value: <span className="text-gray-500">{course.subjectId}</span>,
                },
                {
                  key: "ผู้สอน",
                  value: <span className="text-blue-500">{course.professor?.fullname}</span>,
                },
              ]}
            />
          ))}
      </CourseListWrapper>
    </>
  );
};

export default SystemClosedCourses;
