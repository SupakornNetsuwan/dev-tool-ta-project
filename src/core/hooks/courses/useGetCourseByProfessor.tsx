import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";

const useGetCourseByProfessor = (professorId: string) => {
  return useQuery<AxiosResponse<{ message: string; data: FetchCourseType[] }>, AxiosError<{ message: string }>>({
    queryKey: ["getCoursesByProfessorId", professorId],
    queryFn: async () => {
      return axios.get(`/api/subjects?professorId=${professorId}`);
    },
  });
};

export default useGetCourseByProfessor;
