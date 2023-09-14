import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";
import { EnrollStatus } from "@prisma/client";

const useGetEnrolls = ( enrollStatus?: EnrollStatus) => {
  return useQuery<AxiosResponse<{ message: string; data: ResponseGetEnrollsType }>, AxiosError<{ message: string }>>({
    queryKey: ["getEnrolls",  enrollStatus],
    queryFn: () => axios.get(`/api/enrolls`, { params: { enrollStatus } }),
  });
};

export default useGetEnrolls;
