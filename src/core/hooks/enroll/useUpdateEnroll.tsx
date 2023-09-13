import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { EnrollUpdateType } from "@/app/api/subjects/studentView/[subjectId]/FullCourseWithEnrollStatusType";

const useUpdateEnroll = (subjectId: string) => {
  return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, EnrollUpdateType>({
    mutationKey: ["updateEnroll", subjectId],
    mutationFn: async (payload) => {
      return axios.patch(`/api/subjects/studentView/${subjectId}`, payload);
    },
  });
};

export default useUpdateEnroll;
