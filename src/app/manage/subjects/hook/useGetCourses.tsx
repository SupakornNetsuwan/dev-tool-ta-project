import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { Course } from "@prisma/client";

const useGetCourses = () => {
  return useQuery<AxiosResponse<{ message: string; data: Course[] }>, AxiosError<{ message: string }>>({
    queryKey: ["getCourses"],
    queryFn: async () => {
      return await axios.get("/api/manage/subjects");
    },
    cacheTime: 2 * 60 * 1000,
  });
};

export default useGetCourses;
