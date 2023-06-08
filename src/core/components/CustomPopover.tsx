"use client";
import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { HiSquares2X2 } from "react-icons/hi2";

const CustomPopover = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="px-3 py-2 bg-sky-500 text-white rounded flex items-center space-x-2">
          <HiSquares2X2 className="text-xl" />
          <span>Open popover</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={4}
          className="p-4 bg-gray-50 rounded-lg border data-[state=open]:animate-slideUpAndFade "
        >
          <Popover.Arrow className="fill-white h-2" />
          <div className="flex flex-col space-y-4">
            <div className="flex gap-x-4 items-center justify-between">
              <label htmlFor="username" className="text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="px-2 py-1.5 bg-white rounded outline-none ring-1 ring-gray-300 ring-offset-2 ring-offset-gray-50 focus:ring-offset-4 focus:ring-sky-500 transition-all"
              />
            </div>
            <div className="flex gap-x-4 items-center justify-between">
              <label htmlFor="password" className="text-gray-600">
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="px-2 py-1.5 bg-white rounded outline-none ring-1 ring-gray-300 ring-offset-2 ring-offset-gray-50 focus:ring-offset-4 focus:ring-sky-500 transition-all"
              />
            </div>
            <Popover.Close asChild>
              <button className="self-end text-red-500 rounded border border-red-500 px-1 py-0.5 text-sm hover:shadow cursor-pointer">
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
