import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const useUpdateCourse = () => {
  return useMutation<
    AxiosResponse<{ message: string; data: FetchCourseType }>,
    AxiosError<{ message: string }>,
    {
      professorId: string;
      subjectId: string;
    }
  >({
    mutationFn: (payload) => {
      return axios.patch(`/api/subjects/${payload.subjectId}`, payload);
    }
  });
};

export default useUpdateCourse;
