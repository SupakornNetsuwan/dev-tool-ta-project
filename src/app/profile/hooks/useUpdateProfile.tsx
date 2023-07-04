import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import type { ProfileFormType } from "../types/ProfileFormType";

const useUpdateProfile = () => {
  return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, ProfileFormType>({
    mutationKey: ["updateProfile"],
    mutationFn: (payload) => {
      return axios.patch("/api/user/profile", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};

export default useUpdateProfile;
