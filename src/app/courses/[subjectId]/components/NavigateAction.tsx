import React from "react";
import Link from "next/link";
import type { IconType } from "react-icons/lib";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const NavigateAction: React.FC<{
  href: string;
  children: React.ReactNode;
  isCompleted: boolean | undefined;
}> = ({ href, children, isCompleted }) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "btn click-animation flex flex-col items-center justify-center space-x-2 rounded-lg border bg-gray-50 px-6 py-4 text-center text-gray-500 ring-0 ring-blue-300 ring-offset-0 ring-offset-white duration-100 hover:border-blue-500 hover:bg-blue-50 hover:text-gray-800 hover:ring-1 hover:ring-offset-2",
        isCompleted && "border-none bg-sky-50 text-gray-800"
      )}
    >
      {children}
      {isCompleted && (
        <div className="inline-flex items-center space-x-0.5 mt-2">
          <span className="text-sm font-medium text-blue-400">เรียบร้อยแล้ว</span>
          <HiMiniCheckCircle className=" text-blue-500" />
        </div>
      )}
    </Link>
  );
};

export default NavigateAction;
