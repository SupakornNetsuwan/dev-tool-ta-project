"use client";
import React from "react";
// Components
import CourseListWrapper from "@/core/components/course/CourseListWrapper";
import CourseCard from "../../../core/components/course/CourseCard";
import CreateCourseCard from "./CreateCourseCard";
import LoadingSkeleton from "./LoadingSkeleton";
// Hooks
import useGetCourseByProfessor from "@/core/hooks/courses/useGetCourseByProfessor";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const DisplayCourses: React.FC<{ professorId: string }> = ({ professorId }) => {
  const { data, isLoading } = useGetCourseByProfessor(professorId);
  const courses = data?.data.data;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <CourseListWrapper>
        {courses
          ?.filter((course) => course.creationStatus === "CREATED" || course.creationStatus === "ENROLLABLE")
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
        {courses?.find((course) => course.creationStatus === "UNCREATED") && (
          <CreateCourseCard uncreatedCourses={courses.filter((course) => course.creationStatus === "UNCREATED")} />
        )}
      </CourseListWrapper>
    </>
  );
};

export default DisplayCourses;
