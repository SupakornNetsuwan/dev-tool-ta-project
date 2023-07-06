import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import type {Course } from "@prisma/client";
import type { ResponseGetUserType } from "@/app/api/manage/users/UsersType";

const useUpdateCourse = (param:string) => {
  return useMutation<
    AxiosResponse<{ message: string; data: ResponseGetUserType }>,
    AxiosError<{ message: string }>,
    Pick<Course,  "subjectId" | "professorId">,  
    unknown
  >({
    mutationFn: (payload) => {
      return axios.patch(`/api/manage/subjects/${param}`, payload);
    },
  });
};

export default useUpdateCourse;