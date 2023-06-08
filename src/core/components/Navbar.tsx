"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();

  const routes = [
    { name: "หน้าหลัก", path: "/" },
    {
      name: "สมัครผู้ช่วยสอน",
      path: "/",
    },
    {
      name: "ดูภาพรวมข้อมูล",
      path: "/",
    },
    {
      name: "จัดการบัญชี",
      path: "/",
    },
    {
      name: "เข้าสู่ระบบ",
      path: "/login",
    },
  ];

  return (
    <div className="sticky top-0 flex w-full justify-between bg-gray-50 px-12 py-4">
      <Link href="/">
        <div className="relative h-16 w-52">
          <Image src="/static/itkmitl.svg" alt="itkmitl-banner" priority={true} loading="eager" fill={true} />
        </div>
      </Link>
      <ul className="flex items-center gap-x-4 ">
        {routes.map((route) => {
          const isActive = pathName === route.path;

          return (
            <li key={route.name} className={`${isActive ? "text-gray-800" : "text-gray-500"} `}>
              <Link href={route.path}>{route.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
