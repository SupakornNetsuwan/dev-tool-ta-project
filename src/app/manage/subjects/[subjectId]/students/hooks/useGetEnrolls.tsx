import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { ResponseGetEnrollType } from "@/app/api/enrolls/[subjectId]/EnrollType";

const useGetEnrolls = () => {
  return useQuery<AxiosResponse<{ message: string; data: ResponseGetEnrollType[] }>, AxiosError<{ message: string }>>({
    queryKey: ["getEnrolls"],
    queryFn: () => axios.get(`/api/enrolls`),
  });
};

export default useGetEnrolls;
