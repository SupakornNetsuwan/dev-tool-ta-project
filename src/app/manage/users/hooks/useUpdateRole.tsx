import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";

const useUpdateRole = () => {
  return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>>({
    mutationFn: (payload) => {
      return axios.patch("/api/manage/users", payload);
    },
  });
};

export default useUpdateRole;
