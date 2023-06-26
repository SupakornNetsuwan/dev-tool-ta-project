import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import type { User } from "@prisma/client";
import type { ResponseGetUserType } from "@/app/api/manage/users/UsersType";

const useUpdateRole = () => {
  return useMutation<
    AxiosResponse<{ message: string; data: ResponseGetUserType }>,
    AxiosError<{ message: string }>,
    Pick<User, "id" | "role">,
    unknown
  >({
    mutationFn: (payload) => {
      return axios.patch("/api/manage/users", payload);
    },
  });
};

export default useUpdateRole;
