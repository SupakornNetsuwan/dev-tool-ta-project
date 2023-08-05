"use client";
import { useMemo } from "react";
// Components
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
        {courses?.length == 0 ? (
          <div className="col-span-12 flex h-[30vh] w-full items-center justify-center bg-white">
            <p className="text-gray-500">ไม่มีรายการวิชาใด 🍃</p>
          </div>
        ) : (
          courses
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
                      <div className="line-clamp-2 font-semibold text-gray-800 [text-wrap:balance]">
                        <p title={`${course.nameEng} (${course.nameThai})`}>
                          {course.nameEng}
                          <br />({course.nameThai})
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: "รหัสวิชา",
                    value: <span className="text-gray-500">{course.subjectId}</span>,
                  },
                  {
                    key: "ผู้สอน",
                    value: course.professor?.fullname ? (
                      <span className="text-blue-500">{course.professor.fullname}</span>
                    ) : (
                      <span className="text-red-500">ยังไม่กำหนดผู้สอน</span>
                    ),
                  },
                ]}
              />
            ))
        )}
      </CourseListWrapper>
    </>
  );
};
export default Courses;
