"use client";
import React, { forwardRef } from "react";
import * as Select from "@radix-ui/react-select";
import { HiOutlineChevronUp, HiOutlineChevronDown, HiOutlineChevronUpDown, HiOutlineCheck } from "react-icons/hi2";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";

const SelectItem = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; value: string } & React.ComponentProps<typeof Select.Item>
>(({ value, children, ...props }, ref) => {
  return (
    <Select.Item
      className="relative flex h-[25px] cursor-pointer select-none items-center rounded py-4 pl-6 pr-8 text-sm text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-50 data-[disabled]:text-gray-300 data-[highlighted]:text-gray-600 data-[highlighted]:outline-none"
      value={value}
      ref={ref}
      {...props}
    >
      <Select.ItemIndicator asChild>
        <HiOutlineCheck className="absolute left-1 text-blue-500" />
      </Select.ItemIndicator>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});

SelectItem.displayName = "SelectItem";

const RenderApprovalStatus: React.FC<{
  body: GridRenderCellParams<ResponseGetEnrollsType[number]>;
  setApproval: (newApprovalStatus: ResponseGetEnrollsType[number]["enrollStatus"]) => void;
}> = ({ body, setApproval }) => {
  return (
    <Select.Root
      value={body.value}
      onValueChange={(newApprovalStatus: ResponseGetEnrollsType[number]["enrollStatus"]) =>
        setApproval(newApprovalStatus)
      }
    >
      <Select.Trigger className="flex w-full items-center justify-between gap-1 rounded bg-white px-3 py-2 text-sm  text-gray-500 shadow outline-none hover:shadow-realistic-1 focus:shadow-realistic-2">
        <Select.Value placeholder="คัดเลือก" aria-label="คัดเลือก" />
        <Select.Icon asChild>
          <HiOutlineChevronUpDown className="text-lg text-blue-500" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white ">
            <HiOutlineChevronUp className="text-gray-500" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-2">
            <SelectItem value="PENDING">ไม่คัดเลือก</SelectItem>
            <SelectItem value="APPROVED">อาจารย์คัดเลือก</SelectItem>
            <SelectItem value="FINAL_APPROVED">ผ่านการคัดเลือก</SelectItem>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white">
            <HiOutlineChevronDown className="text-gray-500" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default React.memo(RenderApprovalStatus);
