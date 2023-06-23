"use client";
import React, { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineXMark, HiOutlineArrowSmallRight, HiOutlineClock } from "react-icons/hi2";
import DisplayDate from "./DisplayDate";
// MUI-X (Date picker)
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// dayjs
import dayjs, { Dayjs } from "dayjs"; // Dayjs
import "dayjs/locale/th";
// Hooks
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import useCreateSystemStatus from "../hooks/useCreateSystemStatus";
import useLoadingScreen from "@/core/components/LoadingScreen/hook/useLoadingScreen";
// types
import { SystemStatusPayloadType } from "@/app/api/manage/systemStatus/SystemStatusType";

dayjs.locale("th");

const CreateStatusForm: React.FC = () => {
  const router = useRouter();
  const { openToast } = useCustomToast();
  const { hideLoading, showLoading } = useLoadingScreen();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
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
    // ทำการ disable submit button ไปก่อน
    const submitButtonElement = submitButtonRef.current as HTMLButtonElement;
    submitButtonElement.disabled = true;
    showLoading();

    createSystemStatus.mutate(
      { openDate: dates.openDate, closeDate: dates.closeDate },
      {
        onSuccess: (data) => {
          openToast({
            title: <p className="text-blue-500">สำเร็จ 🎉</p>,
            description: <p>{data.data.message}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
          setTimeout(() => router.refresh(), 1000);
        },
        onError: (error) => {
          submitButtonElement.disabled = false;
          openToast({
            title: <p className="text-red-500">ไม่สามารถกำหนดเวลาได้</p>,
            description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
        onSettled: () => {
          hideLoading();
        },
      }
    );
  };

  return (
    <div className=" rounded-md bg-white p-4 ">
      <div className="flex space-x-2">
        <DateTimePicker
          value={dates.openDate}
          maxDateTime={dayjs(dates.closeDate)}
          minDateTime={dayjs()}
          onChange={setOpenDate}
          label={<p className="font-noto">วัน และ เวลาที่เปิดรับสมัคร</p>}
          className="flex-1 [&>div>input]:font-noto"
        />
        <HiOutlineArrowSmallRight className="self-center text-2xl text-gray-500" />
        <DateTimePicker
          value={dates.closeDate}
          onChange={setCloseDate}
          minDateTime={dayjs(dates.openDate)}
          label={<p className="font-noto">วัน และ เวลาที่ปิดรับสมัคร</p>}
          className="flex-1 [&>div>input]:font-noto"
        />
      </div>
      <div className="my-6 flex space-x-2">
        <DisplayDate preText={<p className="text-gray-800">เริ่มรับสมัคร</p>} date={dates.openDate} />
        <HiOutlineArrowSmallRight className="self-center text-2xl text-gray-500" />
        <DisplayDate preText={<p className="text-gray-500">สิ้นสุดรับสมัคร</p>} date={dates.closeDate} />
      </div>
      <button
        ref={submitButtonRef}
        onClick={createStatusHandler}
        disabled={!dates.openDate || !dates.closeDate}
        className="click-animation btn bg-blue-500 text-white disabled:opacity-50"
      >
        กำหนดเวลารับสมัคร
      </button>
    </div>
  );
};

export default CreateStatusForm;
