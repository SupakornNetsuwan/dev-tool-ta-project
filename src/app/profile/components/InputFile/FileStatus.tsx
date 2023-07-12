import React from "react";
import { HiOutlineCheck, HiOutlineArrowPath } from "react-icons/hi2";

const FileStatus: React.FC<{ status: null | Object | string }> = ({ status }) => {
 
  if (typeof status === "string") {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span>ส่งไฟล์แล้ว</span>
        <HiOutlineCheck />
      </div>
    );
  }

  if (status instanceof Object) {
    return (
      <div className="flex items-center space-x-2 text-sm text-orange-500">
        <span>กำลังเตรียมไฟล์</span> <HiOutlineArrowPath />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-amber-500">
      <span>ยังไม่ได้ส่งไฟล์ โปรดส่งไฟล์</span>
    </div>
  );
};

export default FileStatus;
