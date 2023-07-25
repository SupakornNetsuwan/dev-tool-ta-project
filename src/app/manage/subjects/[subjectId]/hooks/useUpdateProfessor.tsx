import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

const useUpdateProfessor = () => {
  return useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<{ message: string }>,
    {
      subjectId: string;
      professorId: string;
    }
  >({
    mutationKey: ["updateProfessor"],
    mutationFn: async (payload) => {
      return axios.patch(`/api/subjects/${payload.subjectId}`, payload);
    },
  });
};

export default useUpdateProfessor;
