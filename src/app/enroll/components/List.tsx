import React from "react";
import useGetCoursesWithEnrollStatus from "@/core/hooks/studentView/useGetCoursesWithEnrollStatus";
import LoadingSkeleton from "./LoadingSkeleton";
import type { GetCoursesWithEnrollStatusType } from "@/app/api/subjects/studentView/GetCoursesWithEnrollStatusType";
import useWrapperContext from "../hooks/useWrapperContext";

/**
 * @description ทำการ Filter course ที่ต้องการด้วยคำค้นหา
 * @param course วิชาที่กำลังนำไป Filter
 * @param search คำค้นหา
 */

const filterSearchCourse = (course: GetCoursesWithEnrollStatusType[number], search: string) => {
  return course.subjectId.includes(search) || course.nameThai.includes(search) || course.nameEng.includes(search);
};

const List: React.FC<{ children: (courses: GetCoursesWithEnrollStatusType) => JSX.Element }> = ({ children }) => {
  const { data: courses, isLoading } = useGetCoursesWithEnrollStatus();
  const { search } = useWrapperContext();

  if (isLoading) return <LoadingSkeleton />;

  return children(courses?.data.data.filter((course) => filterSearchCourse(course, search)) || []);
};

export default List;
