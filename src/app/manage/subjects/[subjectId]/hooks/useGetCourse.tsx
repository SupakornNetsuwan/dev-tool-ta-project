import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

//  ใช้เพื่อดึงรายละเอียดของวิชา แต่ละวิชา
const useGetCourse = (subjectId: string) => {
  return useQuery<AxiosResponse<{ message: string; data: FetchCourseType }>, AxiosError<{ message: string }>>({
    queryKey: ["getCourses", subjectId],
    queryFn: async () => {
      return await axios.get(`/api/subjects/${subjectId}`);
    },
    cacheTime: 5 * 60 * 1000,
  });
};
export default useGetCourse;
