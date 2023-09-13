import React from "react";
import { HiOutlineArrowDownTray } from "react-icons/hi2";

const FileDownload: React.FC<{ name: string; path: string | undefined | null }> = ({ name, path }) => {
  if (!path)
    return (
      <div className="flex select-none items-center justify-center space-x-2 rounded border bg-gray-50 py-4 text-gray-500 ">
        <HiOutlineArrowDownTray className="text-lg" />
        <span>{name}</span>
      </div>
    );

  return (
    <a
      target="_blank"
      className="flex items-center justify-center space-x-2 rounded border border-blue-500 bg-blue-50 py-4 text-blue-500"
      href={`/api/file?path=${path}`}
      rel="noopener noreferrer"
    >
      <HiOutlineArrowDownTray className="text-lg" />
      <span>{name}</span>
    </a>
  );
};

export default FileDownload;
