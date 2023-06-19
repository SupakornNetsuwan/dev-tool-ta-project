"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineXMark } from "react-icons/hi2";
import DisplayDate from "./DisplayDate";
// MUI-X (Date picker)
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// dayjs
import dayjs, { Dayjs } from "dayjs"; // Dayjs
import "dayjs/locale/th";
// Hooks
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import useCreateSystemStatus from "../hooks/useCreateSystemStatus";
// types
import { SystemStatusPayloadType } from "@/app/api/manage/systemStatus/SystemStatusType";

dayjs.locale("th");

const CreateStatusForm = () => {
  const router = useRouter();
  const { openToast } = useCustomToast();
  const createSystemStatus = useCreateSystemStatus();
  const [dates, setDates] = useState<SystemStatusPayloadType>({
    openDate: dayjs().set("minute", dayjs().minute() + 5),
    closeDate: null,
  });

  const setOpenDate = useCallback(
    (e: Dayjs | null) => {
      setDates({ ...dates, openDate: e });
    },
    [dates]
  );

  const setCloseDate = useCallback(
    (e: Dayjs | null) => {
      setDates({ ...dates, closeDate: e });
    },
    [dates]
  );

  const createStatusHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createSystemStatus.mutate(
      { openDate: dates.openDate, closeDate: dates.closeDate },
      {
        onSuccess: (data) => {
          console.log(data.data);
          openToast({
            title: <p className="text-blue-500">สำเร็จ 🎉</p>,
            description: <p>กำหนดเวลารับสมัครแล้ว</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
          setTimeout(() => router.refresh(), 1000);
        },
        onError: (error) => {
          openToast({
            title: <p className="text-red-500">ไม่สามารถกำหนดเวลาได้</p>,
            description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
      }
    );
  };

  return (
    <div className=" rounded-md bg-white p-4 ">
      <div className="flex space-x-2 [&>div]:w-full">
        <DateTimePicker
          value={dates.openDate}
          maxDateTime={dayjs(dates.closeDate)}
          minDateTime={dayjs()}
          onChange={setOpenDate}
          label={<p className="font-noto">วัน และ เวลาที่เปิดรับสมัคร</p>}
          className="[&>div>input]:font-noto"
        />
        <DateTimePicker
          value={dates.closeDate}
          onChange={setCloseDate}
          minDateTime={dayjs(dates.openDate)}
          label={<p className="font-noto">วัน และ เวลาที่ปิดรับสมัคร</p>}
          className="[&>div>input]:font-noto"
        />
      </div>
      <div className="my-6 [&>div]:flex [&>div]:space-x-2">
        <DisplayDate preText={<p className="text-gray-500">วันที่เปิดรับสมัคร</p>} date={dates.openDate} />
        <DisplayDate preText={<p className="text-gray-500">วันที่ปิดรับสมัคร</p>} date={dates.closeDate} />
      </div>
      <button onClick={createStatusHandler} className="click-animation btn bg-blue-500 text-white">
        กำหนดเวลารับสมัคร
      </button>
    </div>
  );
};

export default CreateStatusForm;
