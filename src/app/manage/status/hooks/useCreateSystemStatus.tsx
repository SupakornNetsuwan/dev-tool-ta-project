import axios, { AxiosError, AxiosResponse } from "axios";
import type { SystemStatusPayloadType } from "@/app/api/manage/systemStatus/SystemStatusType";
// tanstack
import { useMutation } from "@tanstack/react-query";

const useCreateSystemStatus = () => {
  return useMutation<AxiosResponse, AxiosError<{ message: string }>, SystemStatusPayloadType, unknown>({
    mutationFn: ({ openDate, closeDate }) => {
      return axios.post("/api/manage/systemStatus", {
        openDate,
        closeDate,
      });
    },
  });
};

export default useCreateSystemStatus;
