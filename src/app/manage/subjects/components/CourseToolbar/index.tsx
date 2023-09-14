"use client";
import * as Toolbar from "@radix-ui/react-toolbar";
import useCoursesToolbar from "../../hooks/useCoursesToolbar";
import DropdownFilter from "./DropdownFilter";
import { HiOutlineFunnel, HiOutlinePlus, HiOutlineArrowDownTray } from "react-icons/hi2";
import Link from "next/link";

const CourseToolbar = () => {
  const { option, setOption } = useCoursesToolbar();

  return (
    <Toolbar.Root className="mb-4 flex rounded border bg-white p-2">
      <Toolbar.ToggleGroup
        type="single"
        defaultValue="all"
        value={option}
        onValueChange={setOption}
        aria-label="Choose course filtering"
        className="flex w-full justify-between gap-x-2"
      >
        <DropdownFilter>
          <button className="flex select-none items-center justify-between space-x-1 rounded bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none hover:bg-gray-100">
            <span>ฟิลเตอร์</span>
            <HiOutlineFunnel />
          </button>
        </DropdownFilter>
        <div className="flex space-x-2">
          <Toolbar.Link className="rounded  bg-blue-50 text-blue-500 hover:bg-blue-100" asChild>
            <Link href="/manage/subjects/export" className="flex items-center space-x-1 px-4 py-1.5 text-sm">
              <HiOutlineArrowDownTray />
              <span>ฟอร์มอนุมัติ</span>
            </Link>
          </Toolbar.Link>
          <Toolbar.Link className="rounded border border-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-100" asChild>
            <Link href="/manage/subjects/upload" className="flex items-center space-x-1 px-4 py-1.5 text-sm">
              <HiOutlinePlus />
              <span>อัปโหลดวิชา</span>
            </Link>
          </Toolbar.Link>
        </div>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export default CourseToolbar;
