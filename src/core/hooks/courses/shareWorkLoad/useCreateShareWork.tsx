import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import type { CourseWorkLoadModifyType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const useCreateShareWorkLoadFile = (subjectId: string) => {
  return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, CourseWorkLoadModifyType>({
    mutationFn: async (payload) => {
      return axios.patch(`/api/subjects/${subjectId}/shareWorkLoad`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};

export default useCreateShareWorkLoadFile;
