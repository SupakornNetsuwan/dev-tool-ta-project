
import axios, { AxiosError, AxiosResponse } from "axios";
import { Courses } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

const useCreateCourse = ()=>{
    return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, Courses[], unknown>({
        mutationFn: (Courses) => {
          return axios.post("/api/manage/subject", Courses
          );
        },
      });
}
export default useCreateCourse