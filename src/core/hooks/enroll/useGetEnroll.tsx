import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";

const useGetEnroll = (subjectId: string) => {
  const query =  useQuery<AxiosResponse<{ message: string; data: ResponseGetEnrollsType }>, AxiosError<{ message: string }>>({
    queryKey: ["getEnrolls", subjectId],
    queryFn: () => axios.get(`/api/enrolls/${subjectId}`),
  });
  return query
};

export default useGetEnroll;
