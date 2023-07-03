import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { Prisma } from "@prisma/client";

type ProfileWithAllIncluded = Prisma.ProfileGetPayload<{ include: { UserDocument: true } }>;

const useGetProfile = () => {
  return useQuery<AxiosResponse<{ message: string; data: ProfileWithAllIncluded }>, AxiosError<{ message: string }>>({
    queryKey: ["getProfile"],
    queryFn: async () => {
      return axios.get("/api/user/profile");
    },
    staleTime: 3 * 60 * 1000,
  });
};

export default useGetProfile;
