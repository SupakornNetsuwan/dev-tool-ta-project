import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import type { ProfileFormType } from "../../../../app/api/users/[id]/profile/ProfileFormType";

const useGetProfile = (id: string) => {
  return useQuery<AxiosResponse<{ message: string; data: ProfileFormType | null }>, AxiosError<{ message: string }>>({
    queryKey: ["getProfile"],
    queryFn: async () => {
      return axios.get(`/api/users/${id}/profile`);
    }
  });
};

export default useGetProfile;
