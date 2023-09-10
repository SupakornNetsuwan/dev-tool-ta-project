import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { EnrollCourseFormType } from "@/app/api/subjects/studentView/[subjectId]/FullCourseWithEnrollStatusType";

const useEnrollCourse = (subjectId: string) => {
  return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, EnrollCourseFormType>({
    mutationFn: async (payload) => {
      return axios.post(`/api/subjects/studentView/${subjectId}`, payload);
    },
    mutationKey: ["enrollCourse"],
  });
};

export default useEnrollCourse;
