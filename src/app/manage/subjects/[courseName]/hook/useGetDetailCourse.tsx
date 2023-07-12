import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { Course } from "@prisma/client";
///  ใช้เพื่อดึงรายละเอียดของวิชา
const useGetDetailCourse = (param: string) => {
  return useQuery<AxiosResponse<{ message: string; data: Course }>, AxiosError<{ message: string }>>({
    queryKey: ["getCourse"],
    queryFn: async () => {
      return await axios.get(`/api/manage/subjects/${param}`);
    },
    cacheTime: 5 * 60 * 1000,
  });
};
export default useGetDetailCourse;
