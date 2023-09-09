import React from "react";
import useGetSystemStatus from "@/core/hooks/systemStatus/useGetSystemStatus";
import { twMerge } from "tailwind-merge";

const SystemStatus = () => {
  const { data: systemStatus, isLoading } = useGetSystemStatus();
  const isOpen = systemStatus?.data.data?.isOpen;

  if (isLoading) {
    return <div className="h-3 w-24 rounded-full bg-slate-100"></div>;
  }

  return (
    <div className="flex items-center space-x-1">
      <div
        className={twMerge("aspect-square w-2 rounded-full", isOpen ? "animate-pulse bg-green-500" : "bg-gray-500")}
      />
      <span className={twMerge("text-xs ", isOpen ? "text-green-500" : "text-gray-500")}>
        {isOpen ? "ระบบเปิดรับสมัคร" : "ระบบปิดรับสมัคร"}{" "}
      </span>
    </div>
  );
};

export default SystemStatus;
