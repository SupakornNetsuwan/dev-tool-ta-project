"use client";
import { useMemo } from "react";
import CourseCard from "./CourseCard";
import UplaodCourseCard from "./UploadCourseCard";
import CourseListWrapper from "./CourseListWrapper";
// Hooks
import useGetCourses from "../hook/useGetCourses";
// Types
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const DisplayCourse = () => {
  // ก็ทำให้มัน response มามีการ include professor ด้วย
  const { data, isLoading, isError, error } = useGetCourses();
  const courses = useMemo(() => data?.data.data, [data?.data]);

  if (isError) throw new Error(error.response?.data.message);

  if (isLoading)
    return (
      <>
        <div className="grid animate-pulse grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7">
          <div className="relative aspect-video rounded bg-gray-200 before:absolute before:bottom-4 before:left-4 before:right-4 before:block before:h-4 before:bg-gray-300" />
          <div className="relative aspect-video rounded bg-gray-200  before:absolute before:bottom-4 before:left-4 before:right-4 before:block before:h-4 before:bg-gray-300" />
          <div className="relative aspect-video rounded bg-gray-200  before:absolute before:bottom-4 before:left-4 before:right-4 before:block before:h-4 before:bg-gray-300" />
        </div>
      </>
    );

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
export default DisplayCourse;
