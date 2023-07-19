import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseGetUsersType } from "@/app/api/users/UsersType";

const useGetStudentsEnroll = () => {
  return useQuery<AxiosResponse<{ message: string; data: ResponseGetUsersType }>, AxiosError<{ message: string }>>({
    queryKey: ["getUsers"],
    queryFn: () => axios.get("/api/users")
  });
};

export default useGetStudentsEnroll;
