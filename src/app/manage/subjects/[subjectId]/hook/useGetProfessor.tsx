import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse, AxiosError } from "axios";
import axios from "axios";
import type { ResponseGetUsersType } from "@/app/api/users/UsersType";

const useGetProfessor = () => {
  return useQuery<AxiosResponse<{ message: string; data: ResponseGetUsersType }>, AxiosError<{ message: string }>>({
    queryKey: ["getProfessors"],
    queryFn: async () => {
      return axios.get("/api/users?role=PROFESSOR");
    }
  });
};

export default useGetProfessor;
