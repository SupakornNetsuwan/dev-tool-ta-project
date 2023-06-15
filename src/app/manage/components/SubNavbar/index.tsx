import React from "react";
import Link from "next/link";

/**
 * @description Wrapper สำหรับ Sub Navbar
 */

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center space-x-4 border-t bg-white p-4">{children}</div>;
};

/**
 * @description Item ใน Wrapper ของ Sub Navbar
 */

const Item: React.FC<{ children: React.ReactNode; path: string; icon?: JSX.Element }> = ({ children, path, icon }) => {
  return (
    <div>
      <Link href={path} className="flex items-center space-x-1 ">
        <div>{icon}</div>
        <div>{children}</div>
      </Link>
    </div>
  );
};

export default {
  Wrapper,
  Item,
};
