"use client";
import React, { forwardRef } from "react";
import Link from "next/link";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import CustomTooltip from "@/core/components/CustomTooltip";

type WithTooltipProps = {
  disabled?: boolean;
};

type NavigateActionProps = {
  href: string;
  children: React.ReactNode;
  isCompleted: boolean | undefined;
} & WithTooltipProps;

const NavigateAction: React.FC<NavigateActionProps> = ({ href, children, isCompleted, disabled }) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "btn click-animation flex flex-col items-center justify-center space-x-2 rounded-lg border bg-gray-50 px-6 py-4 text-center text-gray-500 ring-0 ring-blue-300 ring-offset-0 ring-offset-white duration-100 hover:border-blue-500 hover:bg-blue-50 hover:text-gray-800 hover:ring-1 hover:ring-offset-2",
        isCompleted && "border-none bg-sky-50 text-gray-800",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      {children}
      {isCompleted && (
        <div className="mt-2 inline-flex items-center space-x-0.5">
          <span className="text-sm font-medium text-blue-400">เรียบร้อยแล้ว</span>
          <HiMiniCheckCircle className=" text-blue-500" />
        </div>
      )}
    </Link>
  );
};

NavigateAction.displayName = "NavigateAction";

const withTooltip = <P,>(Component: React.ComponentType<P>) => {
  const render = (props: P & WithTooltipProps) => {
    if (!props.disabled) return <Component {...props} />;

    return (
      <>
        <CustomTooltip.tooltip
          renderContent={
            <CustomTooltip.TooltipContent sideOffset={5} className="bg-white text-red-500 ">
              โปรดทำขั้นตอนก่อนหน้าให้เสร็จสิ้นก่อน
            </CustomTooltip.TooltipContent>
          }
        >
          <div className="grid grid-cols-1">
            <Component {...props} />
          </div>
        </CustomTooltip.tooltip>
      </>
    );
  };

  return render;
};

export default withTooltip<NavigateActionProps>(NavigateAction);
