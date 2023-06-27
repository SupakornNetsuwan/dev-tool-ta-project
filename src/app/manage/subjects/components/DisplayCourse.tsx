"use client"
import CardCourse from "./CardCourse"
import Grid from '@mui/material/Unstable_Grid2';
import CardUpload from "./CardUpload";
import Link from "next/link";
import useGetCourse from "../hook/useGetCourse";
import { Courses } from "@prisma/client";
import { ClassNames } from "@emotion/react";
const DisplayCourse = ()=>{
    const {data, isLoading,isError} = useGetCourse()
    if(isLoading) return <p>...กำลังโหลดรายวิชา</p>
    if(isError) return <pre>เกิดข้อผิดพลาด</pre>
    const Courses:Courses[] = data.data
    return(
        <>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 5, sm: 6, md: 20 }}>
                    {Courses.map((course:Courses, index)=> (
                        <Grid xs={4} sm={2} md={4} key={course.courseId}>
                            <CardCourse course={course} />
                        </Grid>
                    ))}
                    {Courses.length >= 0 && (
                            <Grid xs={4} sm={2} md={4}>
                                <Link href="/manage/subjects/upload">
                                    <CardUpload />
                                </Link>
                            </Grid>
                    )}
                </Grid>
        </>
    )
}
export default DisplayCourse