import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseGetUsersType } from "@/app/api/manage/users/UsersType";

const useGetUsers = () => {
  return useQuery<AxiosResponse<{ message: string; data: ResponseGetUsersType }>, AxiosError<{ message: string }>>({
    queryKey: ["getUsers"],
    queryFn: () => axios.get("/api/manage/users")
  });
};

export default useGetUsers;
