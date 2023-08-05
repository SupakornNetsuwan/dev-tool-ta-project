"use client";
import React from "react";
import * as Popover from "@radix-ui/react-popover";

const CustomPopover: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={4}
          className="rounded-lg border bg-gray-50 p-4 data-[state=open]:animate-slideUpAndFade "
        >
          <Popover.Arrow className="h-2 fill-white" />
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between gap-x-4">
              <label htmlFor="username" className="text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="rounded bg-white px-2 py-1.5 outline-none ring-1 ring-gray-300 ring-offset-2 ring-offset-gray-50 transition-all focus:ring-sky-500 focus:ring-offset-4"
              />
            </div>
            <div className="flex items-center justify-between gap-x-4">
              <label htmlFor="password" className="text-gray-600">
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="rounded bg-white px-2 py-1.5 outline-none ring-1 ring-gray-300 ring-offset-2 ring-offset-gray-50 transition-all focus:ring-sky-500 focus:ring-offset-4"
              />
            </div>
            <Popover.Close asChild>
              <button className="cursor-pointer self-end rounded border border-red-500 px-1 py-0.5 text-sm text-red-500 hover:shadow">
                close
              </button>
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default CustomPopover;
