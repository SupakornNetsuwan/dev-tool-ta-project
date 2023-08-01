import React, { HTMLAttributes } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const CreateGroupBtn: React.FC<React.ComponentPropsWithoutRef<"button">> = ({ onClick, className, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      onClick={onClick}
      className={twMerge(
        "btn click-animation flex items-center justify-center space-x-2 rounded border border-transparent bg-blue-50 p-2 text-blue-500  hover:border-blue-500",
        className
      )}
    >
      <span>เพิ่มกลุ่มการสอน</span>
      <HiOutlinePlus className="text-lg" />
    </button>
  );
};

export default CreateGroupBtn;
