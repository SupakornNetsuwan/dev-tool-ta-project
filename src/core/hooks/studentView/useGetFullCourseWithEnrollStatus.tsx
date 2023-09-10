import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import type { GetFullCourseWithEnrollStatusType } from "@/app/api/subjects/studentView/[subjectId]/FullCourseWithEnrollStatusType";

const useGetFullCourseWithEnrollStatus = (subjectId: string) => {
  return useQuery<
    AxiosResponse<{ message: string; data: GetFullCourseWithEnrollStatusType }>,
    AxiosError<{ message: string }>
  >({
    queryFn: async () => {
      return axios.get(`/api/subjects/studentView/${subjectId}`);
    },
    retry: false,
    queryKey: ["getFullCourseWithEnrollStatus", subjectId],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useGetFullCourseWithEnrollStatus;
