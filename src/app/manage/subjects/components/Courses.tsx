"use client";
import { useMemo } from "react";
// Components
import UplaodCourseCard from "./UploadCourseCard";
import CourseListWrapper from "@/core/components/course/CourseListWrapper";
import CourseCard from "@/core/components/course/CourseCard";
import LoadingSkeleton from "./LoadingSkeleton";
// Hooks
import useGetCourses from "@/core/hooks/courses/useGetCourses";
import useCoursesToolbar from "../hooks/useCoursesToolbar";
// Types
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const Courses = () => {
  const { data, isLoading, isError, error } = useGetCourses();
  const { option } = useCoursesToolbar();
  const courses = useMemo(() => data?.data.data, [data?.data]);

  if (isError) throw new Error(error.response?.data.message);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
      <CourseListWrapper>
        {courses
          ?.filter((course) => {
            if (option === "all") return true;
            else if (option === "undone") return course.creationStatus !== "ENROLLABLE";
            else return course.creationStatus === "ENROLLABLE";
          })
          ?.map((course: FetchCourseType, index) => (
            <CourseCard
              key={index}
              course={course}
              href={`/manage/subjects/${course.subjectId}`}
              basicDataDisplay={[
                {
                  key: "ชื่อวิชา",
                  value: (
                    <span className="font-semibold text-gray-800">
                      {course.nameEng} <br />({course.nameThai})
                    </span>
                  ),
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
        <UplaodCourseCard />
      </CourseListWrapper>
    </>
  );
};
export default Courses;
