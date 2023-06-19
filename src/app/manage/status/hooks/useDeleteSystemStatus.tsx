import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";

const useDeleteSystemStatus = () => {
  return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, null, unknown>({
    mutationFn: (payload) => {
      return axios.delete("/api/manage/systemStatus");
    },
  });
};

export default useDeleteSystemStatus;
