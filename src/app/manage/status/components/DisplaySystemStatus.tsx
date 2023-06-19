import React from "react";
import DisplayDate from "./DisplayDate";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import type { SystemStatus } from "@prisma/client";
import CancelSystemStatus from "./CancelSystemStatus";
// dayjs
import dayjs from "dayjs";
import "dayjs/locale/th";

dayjs.locale("th");

const DisplaySystemStatus: React.FC<{ systemStatus: SystemStatus }> = ({ systemStatus }) => {
  return (
    <div className="bg-white p-4">
      <div className="my-6 flex space-x-2 rounded-md ">
        <DisplayDate preText={<p className="text-gray-800">เริ่มรับสมัคร</p>} date={dayjs(systemStatus.openDate)} />
        <HiOutlineArrowSmallRight className="self-center text-2xl text-gray-500" />
        <DisplayDate preText={<p className="text-gray-500">สิ้นสุดรับสมัคร</p>} date={dayjs(systemStatus.closeDate)} />
      </div>
      <CancelSystemStatus />
    </div>
  );
};

export default DisplaySystemStatus;
