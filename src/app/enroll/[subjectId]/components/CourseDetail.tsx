import React, { HTMLAttributes } from "react";
import List from "@/core/components/List";
import useGetFullCourseWithEnrollStatus from "@/core/hooks/studentView/useGetFullCourseWithEnrollStatus";
import { useParams } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";
import { twMerge } from "tailwind-merge";

const MajorDetail: React.FC<{ topic: string; value: string | undefined } & HTMLAttributes<HTMLDivElement>> = ({
  topic,
  value,
  className,
  ...props
}) => {
  return (
    <div {...props} className={twMerge("rounded border p-4", className)}>
      <h3 className="text-sm text-gray-500">{topic}</h3>
      <p
        title={value}
        className={twMerge("truncate text-base font-semibold text-gray-800 sm:text-lg", !value && "text-gray-500")}
      >
        {value || "ไม่ระบุ"}
      </p>
    </div>
  );
};

const CourseDetail = () => {
  const { subjectId } = useParams();
  const { data, isLoading } = useGetFullCourseWithEnrollStatus(subjectId);
  const detail = data?.data.data;

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="rounded-sm bg-white p-4">
      <p className="pb-2 text-lg font-medium text-blue-500">รายละเอียดวิชา</p>
      <div className="mb-4 flex flex-col space-y-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <MajorDetail topic="ชื่อวิชาภาษาอังกฤษ" value={detail?.nameEng} />
          <MajorDetail topic="ชื่อวิชาภาษาไทย" value={detail?.nameThai} />
          <MajorDetail topic="รหัสวิชา" value={detail?.subjectId} />
          <MajorDetail
            topic="อาจารย์ผู้สอน"
            value={`${detail?.firstname || "-"} ${detail?.lastname || "-"} (${detail?.professorId || "-"})`}
          />
        </div>
      </div>
      <div className="my-4 rounded-sm bg-blue-50/50 p-4 text-gray-800">{detail?.description || "ไม่ระบุ"}</div>
      <List.Wrapper>
        <List.Item topic="หน่วยกิต">
          <p className="text-gray-500">{detail?.credit || "ไม่ระบุ"}</p>
        </List.Item>
        <List.Item topic="การติดต่อ">
          <p className="text-gray-500">{detail?.contact || "ไม่ระบุ"}</p>
        </List.Item>
        <List.Item topic="เงื่อนไขในการสมัคร">
          <p className=" text-gray-500">{detail?.enrollCondition || "ไม่ระบุ"}</p>
        </List.Item>
      </List.Wrapper>
    </div>
  );
};

export default CourseDetail;
