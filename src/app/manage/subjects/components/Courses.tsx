"use client";
import { useMemo } from "react";
// Components
import CourseCard from "./CourseCard";
import UplaodCourseCard from "./UploadCourseCard";
import CourseListWrapper from "./CourseListWrapper";
import LoadingSkeleton from "./LoadingSkeleton";
// Hooks
import useGetCourses from "@/core/hooks/courses/useGetCourses";
// Types
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const Courses = () => {
  const { data, isLoading, isError, error } = useGetCourses();
  const courses = useMemo(() => data?.data.data, [data?.data]);

  if (isError) throw new Error(error.response?.data.message);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
      <CourseListWrapper>
        {courses?.map((course: FetchCourseType, index) => (
          <CourseCard key={index} course={course} />
        ))}
        <UplaodCourseCard />
      </CourseListWrapper>
    </>
  );
};
export default Courses;
