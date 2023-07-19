"use client";
import React, { useState, useRef } from "react";
// Hooks
import useGetProfessor from "../hook/useGetProfessor";
import useUpdateCourse from "../hook/useUpdateCourse";
import { useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
// component
import * as Select from "@radix-ui/react-select";
import {
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineChevronUpDown,
  HiOutlineCheck,
  HiOutlineXMark,
} from "react-icons/hi2";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; value: string } & React.ComponentProps<typeof Select.Item>
>(({ value, children, ...props }, forwardRef) => {
  return (
    <Select.Item
      className="relative flex h-[25px] cursor-pointer select-none items-center rounded py-4 pl-6 pr-8 text-sm text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-50 data-[disabled]:text-gray-300 data-[highlighted]:text-gray-600 data-[highlighted]:outline-none"
      value={value}
      ref={forwardRef}
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

const SelectProfessorComponent: React.FC<{
  value: string | undefined;
  subjectId: string;
}> = ({ value, subjectId }) => {
  const { data } = useGetProfessor();
  const [fitlerSearch, setFitlerSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const updateCourse = useUpdateCourse();
  const queryClient = useQueryClient();
  const { openToast } = useCustomToast();

  const setProfessor = (newProfessorId: string) => {
    updateCourse.mutate(
      {
        professorId: newProfessorId,
        subjectId: subjectId,
      },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries({
            queryKey: ["getCourse"],
          });
          openToast({
            title: <p className="text-blue-500">บันทึกวิชาสำเร็จ 🎉</p>,
            description: <p>อัพโหลดรายวิชาเรียบร้อย</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
        onError(error, variables, context) {
          openToast({
            title: <p className="text-red-500">ไม่สามารถบันทึกรายวิชาได้</p>,
            description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
      }
    );
  };

  const closeSelectHandler = (isOpen: boolean) => {
    if (!isOpen) {
      setFitlerSearch("");
    } else {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <Select.Root onValueChange={setProfessor} value={value} onOpenChange={closeSelectHandler}>
        <Select.Trigger
          className="w-50 flex items-center justify-between gap-1 rounded bg-white px-[15px] py-2 text-sm text-gray-500 shadow outline-none hover:shadow-realistic-1 focus:shadow-realistic-2"
          aria-label="Professor choosing"
        >
          <Select.Value placeholder="เลือกอาจารย์" aria-label="เลือกอาจารย์" />
          <Select.Icon asChild>
            <HiOutlineChevronUpDown className="text-lg text-blue-500" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          >
            <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white ">
              <HiOutlineChevronUp className="text-gray-500" />
            </Select.ScrollUpButton>
            <div className="w-full p-1">
              <input
                ref={inputRef}
                type="text"
                value={fitlerSearch}
                onChange={(e) => setFitlerSearch(e.target.value)}
                className="w-full rounded border p-1.5 text-sm text-gray-500 outline-none"
              />
            </div>
            <Select.Viewport className="max-h-[12em] p-2">
              {data?.data.data
                .filter((professor) => professor.fullname.includes(fitlerSearch) || professor.id === value)
                .map(({ id, fullname }) => (
                  <SelectItem key={id} value={id}>
                    {fullname}
                  </SelectItem>
                ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white">
              <HiOutlineChevronDown className="text-gray-500" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {!value && <p className="mt-2 text-xs text-red-500">*ต้องกำหนดอาจารย์ของรายวิชานี้</p>}
    </div>
  );
};
export default React.memo(SelectProfessorComponent);
