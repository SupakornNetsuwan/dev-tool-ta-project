import React from "react";
import useWrapperContext from "../hooks/useWrapperContext";
import { HiMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const Search: React.FC = () => {
  const { search, setSearch } = useWrapperContext();

  const emptySearch = () => setSearch("");

  return (
    <div className="relative inline-block w-full max-w-[15em] ">
      <input
        type="text"
        placeholder="รหัสวิชา / ชื่อวิชา"
        value={search}
        id="search-course"
        onChange={(e) => setSearch(e.target.value)}
        className={twMerge(
          "w-full rounded border px-3 py-2 pl-8 text-sm text-gray-800 outline-none transition-all duration-300 ease-out",
          search && "px-3 pr-8"
        )}
      />
      <HiMagnifyingGlass
        className={twMerge(
          "pointer-events-none absolute left-2 top-1/2 block -translate-y-1/2 text-lg text-gray-500 transition-all duration-300 ease-out",
          search && "left-0 opacity-0"
        )}
      />
      <HiOutlineXMark
        onClick={emptySearch}
        className={twMerge(
          "pointer-events-none absolute right-0 top-1/2 box-content block -translate-y-1/2 cursor-pointer p-1 text-lg text-gray-500 opacity-0 transition-all duration-300 ease-out",
          search && "opacity-1 pointer-events-auto right-2"
        )}
      />
    </div>
  );
};

export default Search;
