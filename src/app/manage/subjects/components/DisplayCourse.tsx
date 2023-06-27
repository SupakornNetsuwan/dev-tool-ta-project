"use client";
import CardCourse from "./CardCourse";
import Grid from "@mui/material/Unstable_Grid2";
import CardUpload from "./CardUpload";
import Link from "next/link";
import useGetCourses from "../hook/useGetCourses";
import type { Course } from "@prisma/client";

const DisplayCourse = () => {
  const { data, isLoading, isError } = useGetCourses();
  if (isLoading) return <p>กำลังโหลดรายวิชา</p>;
  if (isError) return <p>เกิดข้อผิดพลาด</p>;
  const courses = data.data.data;

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 5, sm: 6, md: 20 }}>
        {courses.map((course: Course, index) => (
          <Grid xs={4} sm={2} md={4} key={course.id}>
            <CardCourse course={course} />
          </Grid>
        ))}
        <Grid xs={4} sm={2} md={4}>
          <Link href="/manage/subjects/upload">
            <CardUpload />
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
export default DisplayCourse;
