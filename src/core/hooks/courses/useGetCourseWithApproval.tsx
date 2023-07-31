import axios from "axios";
import type { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import type { FetchCourseTypeWithApprovementType } from "@/app/api/subjects/[subjectId]/CourseTypes";

//  ใช้เพื่อดึงรายละเอียดของวิชา แต่ละวิชา + ได้ข้อมูลฟอร์มขออนุมัติผู้ช่วยสอนด้วย
const useGetCourseWithApproval = (subjectId: string, params?: AxiosRequestConfig) => {
  return useQuery<
    AxiosResponse<{ message: string; data: FetchCourseTypeWithApprovementType }>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["getCoursesWithapprovalForm", subjectId],
    queryFn: async () => {
      return await axios.get(`/api/subjects/${subjectId}`, {
        ...params,
        params: {
          isGetApprovalForm: true,
          ...params?.params,
        },
      });
    },
    cacheTime: 5 * 60 * 1000
  });
};
export default useGetCourseWithApproval;
