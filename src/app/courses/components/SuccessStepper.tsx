import React from "react";
import { HiMiniCheckCircle, HiMiniXCircle } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const SuccessStepper: React.FC<{ isCompleted: boolean | undefined; children: string }> = ({
  isCompleted,
  children,
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between rounded-sm bg-white p-2 text-sm",
        isCompleted && "bg-gray-50"
      )}
    >
      <span className={twMerge("text-gray-500", isCompleted && "font-medium text-blue-500")}>{children}</span>
      {isCompleted ? (
        <div className="rounded-full bg-blue-50 p-0.5">
          <HiMiniCheckCircle className="text-lg text-blue-500" />
        </div>
      ) : (
        <div className="rounded-full bg-amber-50 p-0.5">
          <HiMiniXCircle className="text-lg text-amber-500" />
        </div>
      )}
    </div>
  );
};

export default SuccessStepper;
