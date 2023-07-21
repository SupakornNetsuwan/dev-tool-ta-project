"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * @description Wrapper สำหรับ Sub Navbar
 */

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex  border-t bg-white p-4">{children}</div>;
};

/**
 * @description Item ใน Wrapper ของ Sub Navbar
 */

export const Item: React.FC<{ children: React.ReactNode; path: string; icon?: JSX.Element }> = ({
  children,
  path,
  icon,
}) => {
  const currentPathName = usePathname();
  const isActive = path === currentPathName;

  return (
    <div>
      <Link
        href={path}
        className={`${
          isActive ? "text-gray-800 underline decoration-blue-500 underline-offset-4" : "text-gray-500"
        } flex items-center space-x-1 `}
      >
        <div className={`${isActive && "text-blue-500"}`}>{icon}</div>
        <div>{children}</div>
      </Link>
    </div>
  );
};
