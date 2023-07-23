import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseGetEnrollType } from "@/app/api/enrolls/[subjectId]/EnrollType";

const useGetEnroll = (subjectId: string) => {
  return useQuery<AxiosResponse<{ message: string; data: ResponseGetEnrollType }>, AxiosError<{ message: string }>>({
    queryKey: ["getEnrolls", subjectId],
    queryFn: () => axios.get(`/api/enrolls/${subjectId}`),
  });
};

export default useGetEnroll;
