"use client";
import React, { forwardRef } from "react";
import type { Role } from "@prisma/client";
import * as Select from "@radix-ui/react-select";
import { HiOutlineChevronUp, HiOutlineChevronDown, HiOutlineChevronUpDown, HiOutlineCheck } from "react-icons/hi2";
import { GridRenderCellParams } from "@mui/x-data-grid";
import type { ResponseGetUsersType } from "@/app/api/manage/users/UsersType";


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

const SelectProfessorComponent:React.FC<{
    body: ResponseGetUsersType,
    setProfessor : (professorFullName:string) => void
}> = ({body, setProfessor})=>{
 return(
        <>
            <Select.Root onValueChange={(professorFullName: string) => setProfessor(professorFullName)}>
                <Select.Trigger
                    className="flex w-50 items-center justify-between gap-1 rounded bg-white px-[15px] py-2 text-sm text-gray-500 shadow outline-none hover:shadow-realistic-1 focus:shadow-realistic-2"
                    aria-label="Professor choosing"
                 >
                    <Select.Value placeholder="เลือก อาจารย์" aria-label="เลือก อาจารย์" />
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
                            {body.map((user) => (
                                <SelectItem key={user.id} value={user.fullname}>
                                    {user.fullname}
                                </SelectItem>
                            ))}
                        </Select.Viewport>
                        <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white">
                            <HiOutlineChevronDown className="text-gray-500" />
                        </Select.ScrollDownButton>
                    </Select.Content>
                    </Select.Portal>
            </Select.Root>
        </>
 )
}
export default React.memo(SelectProfessorComponent)