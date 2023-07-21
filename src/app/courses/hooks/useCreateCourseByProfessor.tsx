import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Course } from "@prisma/client";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const useCreateCourseByProfessor = () => {
  return useMutation<
    AxiosResponse<{ message: string; data: FetchCourseType }>,
    AxiosError<{ message: string }>,
    Partial<Course>
  >({
    mutationKey: ["updateCousesByProfessor"],
    mutationFn: async (payload) => {
      return axios.patch(`/api/subjects/${payload.subjectId}`, payload);
    },
  });
};

export default useCreateCourseByProfessor;
