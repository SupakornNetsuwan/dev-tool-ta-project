import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import type { FetchCourseType , UpdateCourseType} from "@/app/api/subjects/[subjectId]/CourseTypes";

/**
 * @description เป็นการแก้ไขเนื้อหาของวิชาโดยที่สามารถแก้ไขได้ในทุกรายละเอียด ขึ้นอยู่กับ payload ที่ส่งมา ซึ่งจะมี type เป็น  Partial<Course>
 */

const useUpdateCourse = () => {
  return useMutation<
    AxiosResponse<{ message: string; data: FetchCourseType }>,
    AxiosError<{ message: string }>,
    UpdateCourseType
  >({
    mutationKey: ["updateCourse"],
    mutationFn: (payload) => {
      return axios.patch(`/api/subjects/${payload.subjectId}`, payload);
    }
  });
};

export default useUpdateCourse;
