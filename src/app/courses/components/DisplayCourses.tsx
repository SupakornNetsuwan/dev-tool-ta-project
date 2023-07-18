"use client";
import React from "react";
// Components
import CourseListWrapper from "./CourseListWrapper";
import CourseCard from "./CourseCard";
import CreateCourseCard from "./CreateCourseCard";
import LoadingSkeleton from "./LoadingSkeleton";
// Hooks
import useGetCourseByProfessor from "../hooks/useGetCourseByProfessor";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const DisplayCourses: React.FC<{ professorId: string }> = ({ professorId }) => {
  const { data, isLoading } = useGetCourseByProfessor(professorId);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <CourseListWrapper>
        {data?.data.data.map((course: FetchCourseType, index) => (
          <CourseCard key={index} course={course} />
        ))}
        <CreateCourseCard />
      </CourseListWrapper>
    </>
  );
};

export default DisplayCourses;
