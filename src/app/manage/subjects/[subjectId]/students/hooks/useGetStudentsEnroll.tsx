import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseGetEnrollType } from "@/app/api/enroll/[subjectId]/EnrollType";

const useGetStudentsEnroll = (subjectId:string) => {
  return useQuery<AxiosResponse<{ message: string; data:ResponseGetEnrollType }>, AxiosError<{ message: string }>>({
    queryKey: ["getEnroll"],
    queryFn: () => axios.get(`/api/enroll/${subjectId}`)
  });
};

export default useGetStudentsEnroll;
