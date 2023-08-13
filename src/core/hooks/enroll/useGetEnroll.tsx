import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";

const useGetEnroll = (subjectId: string) => {
  return useQuery<AxiosResponse<{ message: string; data: ResponseGetEnrollsType }>, AxiosError<{ message: string }>>({
    queryKey: ["getEnroll", subjectId],
    queryFn: () => axios.get(`/api/enrolls/${subjectId}`),
  });
};

export default useGetEnroll;
