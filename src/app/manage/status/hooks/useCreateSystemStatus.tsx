import axios, { AxiosError, AxiosResponse } from "axios";
import type { SystemStatusPayloadType } from "@/app/api/systemStatus/SystemStatusType";
// tanstack
import { useMutation } from "@tanstack/react-query";

const useCreateSystemStatus = () => {
  return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, SystemStatusPayloadType, unknown>({
    mutationFn: (payload) => {
      return axios.post("/api/systemStatus", payload);
    },
  });
};

export default useCreateSystemStatus;
