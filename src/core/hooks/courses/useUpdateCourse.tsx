import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import type { FetchCourseType , UpdateCourseType} from "@/app/api/subjects/[subjectId]/CourseTypes";

const useUpdateCourse = () => {
  return useMutation<
    AxiosResponse<{ message: string; data: FetchCourseType }>,
    AxiosError<{ message: string }>,
    UpdateCourseType
  >({
    mutationKey: ["updateCourse"],
    mutationFn: (payload) => {
      return axios.patch(`/api/subjects/${payload.subjectId}`, payload);
    }
  });
};

export default useUpdateCourse;
