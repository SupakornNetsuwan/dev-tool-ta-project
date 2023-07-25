import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import type { ProfileFormType } from "../../api/users/[id]/profile/ProfileFormType";

const useUpdateProfile = (id: string) => {
  return useMutation<
    AxiosResponse<{ message: string; data: ProfileFormType }>,
    AxiosError<{ message: string }>,
    ProfileFormType
  >({
    mutationKey: ["updateProfile"],
    mutationFn: (payload) => {
      return axios.patch(`/api/users/${id}/profile`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};

export default useUpdateProfile;
