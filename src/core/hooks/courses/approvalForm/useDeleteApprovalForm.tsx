import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

const useDeleteApprovalForm = () => {
  return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, string>({
    mutationKey: ["deleteApprovalForm"],
    mutationFn: async (subjectId) => {
      return axios.delete(`/api/subjects/${subjectId}/approvalForm`, {
        headers: {
          done: false,
        },
      });
    },
  });
};

export default useDeleteApprovalForm;
