import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

//  ใช้เพื่อดึงรายละเอียดของทุกวิชา
const useGetCourses = () => {
  return useQuery<AxiosResponse<{ message: string; data: FetchCourseType[] }>, AxiosError<{ message: string }>>({
    queryKey: ["getCourses"],
    queryFn: async () => {
      return await axios.get("/api/subjects");
    },
    cacheTime: 1 * 60 * 1000,
  });
};

export default useGetCourses;
