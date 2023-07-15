import axios, { AxiosError, AxiosResponse } from "axios";
import type { SystemStatusPayloadType } from "@/app/api/systemStatus/SystemStatusType";
// tanstack
import { useMutation } from "@tanstack/react-query";

const useCreateSystemStatus = () => {
  return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, SystemStatusPayloadType, unknown>({
    mutationFn: ({ openDate, closeDate }) => {
      return axios.post("/api/systemStatus", {
        openDate,
        closeDate,
      });
    },
  });
};

export default useCreateSystemStatus;
