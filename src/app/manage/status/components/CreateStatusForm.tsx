"use client";
import React, { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineXMark, HiOutlineArrowSmallRight } from "react-icons/hi2";
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
import { SystemStatusPayloadType } from "@/app/api/systemStatus/SystemStatusType";

dayjs.locale("th");

const CreateStatusForm: React.FC = () => {
  const router = useRouter();
  const { openToast } = useCustomToast();
  const { hideLoading, showLoading } = useLoadingScreen();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const createSystemStatus = useCreateSystemStatus();
  const [systemStatusData, setSystemStatusData] = useState<
    Omit<SystemStatusPayloadType, "semester"> & { semester: string }
  >({
    openDate: dayjs().set("minute", dayjs().minute() + 5),
    closeDate: null,
    semester: "1",
    year: dayjs().year() + 543,
  });

  const setOpenDate = useCallback(
    (e: Dayjs | null) => {
      setSystemStatusData({ ...systemStatusData, openDate: e });
    },
    [systemStatusData]
  );

  const setCloseDate = useCallback(
    (e: Dayjs | null) => {
      setSystemStatusData({ ...systemStatusData, closeDate: e });
    },
    [systemStatusData]
  );

  const createStatusHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // ทำการ disable submit button ไปก่อน
    const submitButtonElement = submitButtonRef.current as HTMLButtonElement;
    submitButtonElement.disabled = true;
    showLoading();

    createSystemStatus.mutate(
      { ...systemStatusData, semester: parseInt(systemStatusData.semester) },
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
    <>
      <div className="rounded-md bg-white p-4 ">
        <div className="flex space-x-2">
          <DateTimePicker
            value={systemStatusData.openDate}
            maxDateTime={dayjs(systemStatusData.closeDate)}
            minDateTime={dayjs()}
            onChange={setOpenDate}
            label={<p className="font-noto">วัน และ เวลาที่เปิดรับสมัคร</p>}
            className="flex-1 [&>div>input]:font-noto"
          />
          <HiOutlineArrowSmallRight className="self-center text-2xl text-gray-500" />
          <DateTimePicker
            value={systemStatusData.closeDate}
            onChange={setCloseDate}
            minDateTime={dayjs(systemStatusData.openDate)}
            label={<p className="font-noto">วัน และ เวลาที่ปิดรับสมัคร</p>}
            className="flex-1 [&>div>input]:font-noto"
          />
        </div>
        <div className="my-6 flex space-x-2">
          <DisplayDate preText={<p className="text-gray-800">เริ่มรับสมัคร</p>} date={systemStatusData.openDate} />
          <HiOutlineArrowSmallRight className="self-center text-2xl text-gray-500" />
          <DisplayDate preText={<p className="text-gray-500">สิ้นสุดรับสมัคร</p>} date={systemStatusData.closeDate} />
        </div>
      </div>
      <div className="my-4 flex flex-col gap-4 rounded-md bg-white p-4 md:flex-row">
        <div className="flex flex-col">
          <label htmlFor="system-status-semester" className="text-gray-800">
            ภาคการศึกษา
          </label>
          <p className="text-sm text-gray-500">เช่น 1 2</p>
          <input
            value={systemStatusData.semester}
            onChange={(e) => setSystemStatusData((prev) => ({ ...prev, semester: e.target.value }))}
            type="text"
            name="semester"
            id="system-status-semester"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="system-status-semester" className="text-gray-800">
            ปีการศึกษา
          </label>
          <p className="text-sm text-gray-500">เช่น 2566 2567</p>
          <input
            value={systemStatusData.year}
            onChange={(e) => setSystemStatusData((prev) => ({ ...prev, year: Number(e.target.value) }))}
            type="number"
            name="year"
            id="system-status-year"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:shadow-sm"
          />
        </div>
      </div>
      <button
        ref={submitButtonRef}
        onClick={createStatusHandler}
        disabled={
          !systemStatusData.openDate ||
          !systemStatusData.closeDate ||
          !systemStatusData.semester ||
          !systemStatusData.year
        }
        className="click-animation btn bg-blue-500 text-white disabled:opacity-50"
      >
        กำหนดเวลารับสมัคร
      </button>
    </>
  );
};

export default CreateStatusForm;
