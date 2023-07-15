import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";

const useDeleteSystemStatus = () => {
  return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, null, unknown>({
    mutationFn: (_) => {
      return axios.delete("/api/systemStatus");
    },
  });
};

export default useDeleteSystemStatus;
