import React, { useEffect } from "react";
import type { GetCoursesWithEnrollStatusType } from "@/app/api/subjects/studentView/GetCoursesWithEnrollStatusType";
import { twMerge } from "tailwind-merge";
import { HiChevronRight } from "react-icons/hi2";
import { stagger, timeline } from "motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Status: React.FC<
  { status: GetCoursesWithEnrollStatusType[number]["status"] } & React.ComponentPropsWithoutRef<"div">
> = ({ status, ...props }) => {
  const statusFormatter: Record<typeof status, "ลงทะเบียนแล้ว" | "ยังไม่ลงทะเบียน"> = {
    enrolled: "ลงทะเบียนแล้ว",
    unenrolled: "ยังไม่ลงทะเบียน",
  };
  const formatedStatus = statusFormatter[status];

  return (
    <div
      className={twMerge(
        "inline-block rounded-full px-2 py-0.5 text-xs",
        formatedStatus === "ยังไม่ลงทะเบียน" && " bg-slate-100 text-slate-500",
        formatedStatus === "ลงทะเบียนแล้ว" && " bg-green-100 text-green-500",
        props.className
      )}
    >
      {formatedStatus}
    </div>
  );
};

const Course: React.FC<{ detail: GetCoursesWithEnrollStatusType[number] }> = ({ detail }) => {
  const pathName = usePathname();
  useEffect(() => {
    timeline(
      [
        [
          ".course",
          {
            y: ["1em", 0],
            opacity: [0, 1],
          },
          {
            delay: stagger(0.15),
          },
        ],
      ],
      {
        defaultOptions: {
          easing: "ease-out",
        },
      }
    );
  }, []);

  return (
    <Link
      href={`${pathName}/${detail.subjectId}`}
      className="course mt-1 block cursor-pointer flex-col rounded border bg-white p-4 hover:shadow-realistic-2 sm:p-6"
    >
      <div className="flex flex-col-reverse items-start sm:flex-row justify-between">
        <div className="font-semibold text-blue-500">
          <p>{detail.nameThai}</p>
          <p className="text-sm font-normal text-gray-500"> ({detail.subjectId})</p>
          <p className="text-sm font-normal text-gray-500">({detail.nameEng})</p>
        </div>
        <div className="mb-2 flex w-full items-center justify-between space-x-2 sm:mb-0 sm:w-auto sm:justify-end">
          <Status status={detail.status} />
          <HiChevronRight className="box-content text-xl text-blue-500" />
        </div>
      </div>
    </Link>
  );
};

export default Course;
