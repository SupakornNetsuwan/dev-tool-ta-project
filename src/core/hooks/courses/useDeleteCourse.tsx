import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const useDeleteCourse = () => {
  return useMutation<
    AxiosResponse<{ message: string; data: FetchCourseType }>,
    AxiosError<{ message: string }>,
    { subjectId: string }
  >({
    mutationKey: ["deleteCourse"],
    mutationFn: async (payload) => {
      return axios.delete(`/api/subjects/${payload.subjectId}`);
    }
  });
};

export default useDeleteCourse;
