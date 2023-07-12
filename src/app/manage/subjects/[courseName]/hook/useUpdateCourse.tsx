import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import type { UpdateCourseType } from "@/app/api/manage/subjects/[courseName]/CourseTypes";

const useUpdateCourse = (param: string) => {
  return useMutation<
    AxiosResponse<{ message: string; data: UpdateCourseType }>,
    AxiosError<{ message: string }>,
    unknown,
    unknown
  >({
    mutationFn: (payload) => {
      return axios.patch(`/api/manage/subjects/${param}`, payload);
    },
  });
};

export default useUpdateCourse;
