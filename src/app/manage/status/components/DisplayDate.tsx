import React from "react";
import { Dayjs } from "dayjs";

const DisplayStartDate: React.FC<{ date: Dayjs | null; preText: React.ReactElement }> = ({ date, preText }) => {
  const showingDate = !date ? (
    <p className="text-red-400">ยังไม่ได้กำหนดวัน</p>
  ) : (
    <p className="text-blue-500">
      ระบบจะเปิดในวัน{date?.format("ddd")} ที่ {date?.format("DD/MM/YYYY")} เวลา {date?.format("HH:mm")}
    </p>
  );

  return (
    <div className="flex space-x-2">
      {preText} {showingDate}
    </div>
  );
};

export default DisplayStartDate;
