"use client";
//componets
import CardCourse from "./CardCourse";
import CardUpload from "./CardUpload";
import Link from "next/link";
//hook
import useGetCourses from "../hook/useGetCourses";
//type
import type { Course } from "@prisma/client";

const DisplayCourse = () => {
  const { data, isLoading, isError } = useGetCourses();
  if (isLoading) return <p>กำลังโหลดรายวิชา</p>;
  if (isError) return <p>เกิดข้อผิดพลาด</p>;
  const courses = data.data.data;

  return (
    <>
      <div  className="pl-16 pr-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {courses.map((course: Course, index) => (
          <div key={index} className="col-span-1">
            <CardCourse course={course}></CardCourse>
          </div>
        ))}
        <div  className="col-span-1">
          <Link href="/manage/subjects/upload">
            <CardUpload />
          </Link>
        </div>
      </div>
    </>
  );
};
export default DisplayCourse;
