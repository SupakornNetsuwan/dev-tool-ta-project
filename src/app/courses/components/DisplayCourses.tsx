"use client";
import React from "react";
// Components
import CourseListWrapper from "./CourseListWrapper";
import CourseCard from "./CourseCard";
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
          ?.filter((course) => course.creationStatus === "CREATED")
          ?.map((course: FetchCourseType, index) => (
            <CourseCard key={index} createdCourse={course} />
          ))}
        {courses?.find((course) => course.creationStatus === "UNCREATED") && (
          <CreateCourseCard uncreatedCourses={courses.filter((course) => course.creationStatus === "UNCREATED")} />
        )}
      </CourseListWrapper>
    </>
  );
};

export default DisplayCourses;
