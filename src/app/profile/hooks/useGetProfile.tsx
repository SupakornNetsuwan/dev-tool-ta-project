import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import type { ProfileFormType } from "../types/ProfileFormType";

const useGetProfile = (id: string) => {
  return useQuery<AxiosResponse<{ message: string; data: ProfileFormType | null }>, AxiosError<{ message: string }>>({
    queryKey: ["getProfile"],
    queryFn: async () => {
      return axios.get(`/api/users/${id}/profile`);
    },
    staleTime: 10 * 1000,
  });
};

export default useGetProfile;
