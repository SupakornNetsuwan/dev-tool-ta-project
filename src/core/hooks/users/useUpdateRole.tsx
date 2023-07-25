import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import type { User } from "@prisma/client";
import type { ResponseGetUserType } from "@/app/api/users/UsersType";

const useUpdateRole = () => {
  return useMutation<
    AxiosResponse<{ message: string; data: ResponseGetUserType }>,
    AxiosError<{ message: string }>,
    Pick<User, "id" | "role">
  >({
    mutationFn: (payload) => {
      return axios.patch(`/api/users/${payload.id}`, payload);
    },
  });
};

export default useUpdateRole;
