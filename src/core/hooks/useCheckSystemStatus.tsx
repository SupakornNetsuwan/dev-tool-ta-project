import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import type { SystemStatusResponseType } from "@/app/api/systemStatus/SystemStatusType";

const useCheckSystemStatus = () => {
  return useQuery<AxiosResponse<{ message: string; data: SystemStatusResponseType }, AxiosError<{ message: string }>>>({
    queryKey: ["getSystemStatys"],
    queryFn: async () => {
      return axios.get("/api/systemStatus");
    },
    staleTime: 20 * 60 * 1000,
    cacheTime: 20 * 60 * 1000,
  });
};

export default useCheckSystemStatus;
