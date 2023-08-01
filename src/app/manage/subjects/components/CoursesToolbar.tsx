"use client";
import * as Toolbar from "@radix-ui/react-toolbar";
import useCoursesToolbar from "../hooks/useCoursesToolbar";

const CoursesToolbar = () => {
  const { option, setOption } = useCoursesToolbar();

  return (
    <Toolbar.Root className="mb-4 flex rounded border bg-white p-2">
      <Toolbar.ToggleGroup
        type="single"
        defaultValue="all"
        value={option}
        onValueChange={setOption}
        aria-label="Choose course filtering"
        className="flex gap-x-2"
      >
        <Toolbar.ToggleItem
          className="rounded border border-blue-100 bg-blue-50 text-blue-500 hover:bg-blue-100/80 data-[state='on']:border-blue-500 data-[state='on']:bg-blue-200 data-[state='on']:text-blue-700"
          value="all"
          asChild
        >
          <button className="px-2 py-1.5 text-sm">ทั้งหมด</button>
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="rounded border border-amber-100 bg-amber-50 text-amber-500 hover:bg-amber-100/80 data-[state='on']:border-amber-500 data-[state='on']:bg-amber-200 data-[state='on']:text-amber-700"
          value="undone"
          asChild
        >
          <button className="px-2 py-1.5 text-sm">ไม่สมบูรณ์</button>
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="rounded border border-emerald-100 bg-emerald-50 text-emerald-500 hover:bg-emerald-100/80 data-[state='on']:border-emerald-500 data-[state='on']:bg-emerald-200 data-[state='on']:text-emerald-700"
          value="done"
          asChild
        >
          <button className="px-2 py-1.5 text-sm">สมบูรณ์</button>
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export default CoursesToolbar;
