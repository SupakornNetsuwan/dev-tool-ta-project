import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { twMerge } from "tailwind-merge";
import { HiOutlineChevronRight } from "react-icons/hi2";

const Root: React.FC<React.ComponentPropsWithoutRef<typeof Tabs.Root>> = ({ children, defaultValue, className }) => {
  return (
    <Tabs.Root
      orientation="vertical"
      defaultValue={defaultValue}
      className={twMerge("grid h-full grid-cols-12 md:col-span-3", className)}
    >
      {children}
    </Tabs.Root>
  );
};

const Trigger: React.FC<React.ComponentPropsWithoutRef<typeof Tabs.Trigger>> = ({ value, children, className }) => {
  return (
    <Tabs.Trigger
      value={value}
      className={twMerge(
        "group flex min-h-[5em] text-left text-sm md:text-base w-full items-center justify-between from-white to-gray-100/80 p-4 hover:bg-gray-50 data-[state='active']:bg-gradient-to-r [&>.icon]:data-[state='active']:rounded-full [&>.icon]:data-[state='active']:bg-blue-100 [&>.icon]:data-[state='active']:text-blue-500",
        className
      )}
    >
      <>{children}</>
      <HiOutlineChevronRight className="icon font-medium text-gray-400 p-1 box-content duration-200" />
    </Tabs.Trigger>
  );
};

const CustomTabs = {
  Root,
  Trigger,
};

export default CustomTabs;
