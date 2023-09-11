import React from "react";
import useGetFullCourseWithEnrollStatus from "@/core/hooks/studentView/useGetFullCourseWithEnrollStatus";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

const ShowEnrollData = () => {
  const { subjectId } = useParams();
  const { data: courseDetails } = useGetFullCourseWithEnrollStatus(subjectId);
  const courseDetailsData = courseDetails?.data.data;
  const formatEnrollStatus = courseDetailsData?.Enroll[0].formatEnrollStatus;

  return (
    <div className="mt-4 rounded-sm bg-white p-4">
      <p className="pb-2 text-lg font-medium text-blue-500">สถานะการสมัคร</p>
      <div className="flex gap-2 flex-col-reverse items-start justify-between sm:flex-row sm:items-center">
        <div
          className={twMerge(
            formatEnrollStatus === "ผ่านการคัดเลือก" ? "bg-green-50 text-green-500" : "bg-gray-50 text-gray-500",
            "rounded-full px-3 py-0.5"
          )}
        >
          {formatEnrollStatus}
        </div>
        <p className="text-gray-500 text-sm">
          สมัครวันที่ {dayjs(courseDetailsData?.Enroll[0].enrollDate).format("D/M/YYYY HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default ShowEnrollData;
