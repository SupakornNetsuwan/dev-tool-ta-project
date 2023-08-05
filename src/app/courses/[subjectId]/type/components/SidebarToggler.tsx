import React from "react";
import { HiOutlineBars3BottomLeft, HiOutlineXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const SidebarToggler: React.FC<React.HTMLProps<HTMLButtonElement> & { isSidebarToggle: boolean }> = ({
  onClick,
  className,
  isSidebarToggle,
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "btn btn-click-animation float-right inline-flex items-center justify-center rounded border border-blue-500 bg-blue-50 p-1.5",
        className
      )}
    >
      {isSidebarToggle ? (
        <HiOutlineXMark className="text-lg text-gray-800" />
      ) : (
        <HiOutlineBars3BottomLeft className="text-lg text-gray-800" />
      )}
    </button>
  );
};

export default SidebarToggler;
