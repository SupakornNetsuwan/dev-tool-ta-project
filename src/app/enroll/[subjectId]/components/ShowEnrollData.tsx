import React from "react";
import useGetFullCourseWithEnrollStatus from "@/core/hooks/studentView/useGetFullCourseWithEnrollStatus";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const ShowEnrollData = () => {
  const { subjectId } = useParams();
  const { data: courseDetails } = useGetFullCourseWithEnrollStatus(subjectId);
  const courseDetailsData = courseDetails?.data.data;
  const formatEnrollStatus = courseDetailsData?.Enroll[0].formatEnrollStatus;
  const { height, width } = useWindowSize();

  return (
    <div className="mt-4 rounded-sm bg-white p-4">
      {formatEnrollStatus === "ผ่านการคัดเลือก" && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          gravity={0.3}
          numberOfPieces={300}
          className="fixed top-0"
        />
      )}
      <p className="pb-2 text-lg font-medium text-blue-500">สถานะการสมัคร</p>
      <div className="flex flex-col-reverse items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div
          className={twMerge(
            formatEnrollStatus === "ผ่านการคัดเลือก" ? "bg-green-50 text-green-500" : "bg-gray-50 text-gray-500",
            "rounded-full px-3 py-0.5"
          )}
        >
          {formatEnrollStatus}
        </div>
        <p className="text-sm text-gray-500">
          สมัครวันที่ {dayjs(courseDetailsData?.Enroll[0].enrollDate).format("D/M/YYYY HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default ShowEnrollData;
