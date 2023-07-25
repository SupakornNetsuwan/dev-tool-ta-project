"use client";
import { useQuery } from "@tanstack/react-query";
import type { SystemStatusResponseType } from "@/app/api/systemStatus/SystemStatusType";
import axios, { AxiosError, AxiosResponse } from "axios";

const useGetSystemStatus = () => {
  return useQuery<AxiosResponse<{ message: string; data: SystemStatusResponseType }>, AxiosError<{ message: string }>>({
    queryKey: ["getSystemStatus"],
    queryFn: async () => {
      return axios.get("/api/systemStatus");
    },
    staleTime: 60 * 60 * 1000,
  });
};

export default useGetSystemStatus;
