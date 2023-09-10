import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import type { GetCoursesWithEnrollStatusType } from "@/app/api/subjects/studentView/GetCoursesWithEnrollStatusType";

const useGetCoursesWithEnrollStatus = () => {
  return useQuery<
    AxiosResponse<{ message: string; data: GetCoursesWithEnrollStatusType }>,
    AxiosError<{ message: string }>
  >({
    queryFn: async () => {
      return axios.get("/api/subjects/studentView");
    },
    queryKey: ["getCoursesWithEnrollStatus"],
  });
};

export default useGetCoursesWithEnrollStatus;
