import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";
import { EnrollStatus } from "@prisma/client";
const useGetEnroll = (subjectId: string, enrollStatus:EnrollStatus) => {
  return useQuery<AxiosResponse<{ message: string; data: ResponseGetEnrollsType }>, AxiosError<{ message: string }>>({
    queryKey: ["getEnroll", subjectId],
    queryFn: () => axios.get(`/api/enrolls/${subjectId}`, {params:{enrollStatus}}),
  });
};

export default useGetEnroll;
