"use client";
// Componets
import CourseCard from "./CourseCard";
import UplaodCourseCard from "./UploadCourseCard";
// Hooks
import useGetCourses from "../hook/useGetCourses";
// Types
import type { Course } from "@prisma/client";

const DisplayCourse = () => {
  const { data, isLoading, isError } = useGetCourses();

  if (isLoading) return <p>กำลังโหลดรายวิชา</p>;
  if (isError) return <p>เกิดข้อผิดพลาด</p>;

  const courses = data.data.data;

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {courses.map((course: Course, index) => (
          <CourseCard key={index} course={course}></CourseCard>
        ))}
        <UplaodCourseCard />
      </div>
    </>
  );
};
export default DisplayCourse;
