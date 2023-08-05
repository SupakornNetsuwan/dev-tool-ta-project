import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useCoursesToolbar from "../../hooks/useCoursesToolbar";
import { OptionsType } from "../../providers/CoursesToolbarProvider";

const list: { label: string; value: OptionsType }[] = [
  { label: "ทั้งหมด", value: "all" },
  { label: "ไม่สมบูรณ์", value: "undone" },
  { label: "สมบูรณ์", value: "done" },
];

const DropdownFilter: React.FC<React.ComponentPropsWithoutRef<"button">> = ({ onClick, children }) => {
  const { option, setOption } = useCoursesToolbar();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          collisionPadding={{ left: 20 }}
          align="end"
          sideOffset={5}
          className="bg-white p-2 text-sm text-gray-500 shadow-realistic-1 data-[state=open]:animate-slideUpAndFade"
        >
          <DropdownMenu.RadioGroup value={option} onValueChange={(value) => setOption(value as OptionsType)}>
            {list.map((item) => (
              <DropdownMenu.RadioItem
                key={item.label}
                className="relative cursor-pointer rounded px-3 py-1 pl-6 outline-none focus:bg-blue-50 focus:text-blue-500 data-[state=checked]:text-blue-500"
                value={item.value}
              >
                <DropdownMenu.ItemIndicator className="absolute left-2 top-1/2  h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gray-500 data-[state=checked]:bg-blue-500" />
                {item.label}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownFilter;
