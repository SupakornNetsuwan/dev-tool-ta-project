
import axios, { AxiosError, AxiosResponse } from "axios";
import { Course } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

const useCreateCourse = ()=>{
    return useMutation<AxiosResponse<{ message: string }>, AxiosError<{ message: string }>, Course[], unknown>({
        mutationFn: (Courses) => {
          return axios.post("/api/manage/subjects", Courses
          );
        },
      });
}
export default useCreateCourse