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
        "group flex min-h-[5em] w-full items-center justify-between from-white to-gray-100/80 p-4 text-left text-sm hover:bg-gray-50 data-[state='active']:bg-gradient-to-r md:text-base [&>.icon]:data-[state='active']:rounded-full [&>.icon]:data-[state='active']:bg-blue-100 [&>.icon]:data-[state='active']:text-blue-500",
        className
      )}
    >
      <>{children}</>
      <HiOutlineChevronRight className="icon box-content p-1 font-medium text-gray-400 duration-200" />
    </Tabs.Trigger>
  );
};

const ContentContainer: React.FC<{ children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={twMerge(className)} {...props}>
      {children}
    </div>
  );
};

const Content: React.FC<React.ComponentPropsWithoutRef<typeof Tabs.Content>> = ({
  className,
  children,
  title,
  ...props
}) => {
  return (
    <Tabs.Content {...props} className={twMerge("p-4", className)}>
      <h2 className="text-xl font-semibold mb-2 text-blue-500">{title}</h2>
      {children}
    </Tabs.Content>
  );
};

const CustomTabs = {
  Root,
  Trigger,
  Content,
  List: Tabs.List,
  ContentContainer,
};

export default CustomTabs;
