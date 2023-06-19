import React from "react";
import { Dayjs } from "dayjs";

const DisplayStartDate: React.FC<{ date: Dayjs | null; preText?: React.ReactElement }> = ({ date, preText }) => {
  const showingDate = !date ? (
    <p className="self-center text-red-400">ยังไม่ได้กำหนดวัน</p>
  ) : (
    <div className="text-center text-blue-500">
      {preText && preText}
      <div className="flex flex-wrap justify-center gap-1 lg:gap-2">
        <span>วัน{date?.format("ddd")}</span>
        <span>{date?.format("DD/MM/YYYY")} </span>
        <span>{date?.format("HH:mm")}</span>
      </div>
    </div>
  );

  return (
    <div
      className={`pointer-events-none flex flex-1 select-none justify-center space-x-2 rounded border p-4 ${
        date ? "" : "animate-pulse bg-red-50/80"
      }`}
    >
      {showingDate}
    </div>
  );
};

export default DisplayStartDate;
