import React from "react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";

const SidebarToggler: React.FC<React.HTMLProps<HTMLButtonElement>> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-click-animation absolute right-0 flex aspect-square items-center justify-center rounded border border-blue-500 bg-blue-50 p-1.5 sm:hidden"
    >
      <HiOutlineBars3BottomLeft className="text-lg text-gray-800" />
    </button>
  );
};

export default SidebarToggler;
