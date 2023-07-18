// ต้อง use client?
import React from "react";
import { usePathname } from "next/navigation";
import { HiOutlineArrowRightOnRectangle, HiOutlineBars3 } from "react-icons/hi2";
import type {
  NavbarContentListItemType,
  NavbarContentLoadingType,
  NavbarContentWrapperType,
  NavbarContentMobileDrawer,
} from "./NavbarTypes";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const rolesItem = {
  SUPERADMIN: [{ name: "หน้าหลัก", path: "/" }],
  ADMIN: [
    { name: "หน้าหลัก", path: "/" },
    { name: "จัดการ", path: "/manage" },
  ],
  PROFESSOR: [
    { name: "หน้าหลัก", path: "/" },
    { name: "คอร์ส", path: "/courses" },
  ],
  STUDENT: [
    { name: "หน้าหลัก", path: "/" },
    { name: "สมัครทีเอ", path: "/enroll" },
    { name: "โปรไฟล์", path: "/profile" },
  ],
  UNROLE: [
    { name: "หน้าหลัก", path: "/" },
    {
      name: "เข้าสู่ระบบ",
      path: "/login",
    },
  ],
};

const Wrapper: NavbarContentWrapperType = ({ children, onLoading, openDrawer }) => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  if (isLoading) return onLoading();

  return (
    <>
      <HiOutlineBars3 onClick={openDrawer} className="box-content self-center p-2 text-xl text-gray-800 sm:hidden" />
      <ul className="hidden items-center gap-x-4 sm:flex">
        {children(rolesItem[session?.user.role || "UNROLE"])}
        {session?.user.role && (
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-500 shadow-realistic-2 transition-colors duration-100 hover:border-red-500 hover:bg-red-50 hover:text-red-500 hover:shadow-none"
            >
              ออกจากระบบ
              <HiOutlineArrowRightOnRectangle />
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

const MobileDrawer: NavbarContentMobileDrawer = ({ children, closeDrawer, isDrawerOpen }) => {
  const { data: session } = useSession();

  return (
    <div
      className={`${
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-0 z-50 flex flex-col justify-between bg-white pt-8 transition-transform duration-300 sm:hidden`}
    >
      <ul className="flex flex-col items-center">
        {children(rolesItem[session?.user.role || "UNROLE"])}
        {session?.user.role && (
          <li
            onClick={() => {
              closeDrawer();
              signOut({ callbackUrl: "/login" });
            }}
            className="flex w-full items-center space-x-1 p-4 text-red-500 "
          >
            <span>ออกจากระบบ</span>
            <HiOutlineArrowRightOnRectangle />
          </li>
        )}
      </ul>
      <button onClick={closeDrawer} className="bg-gray-50 p-4 text-gray-800">
        ปิด
      </button>
    </div>
  );
};

/**
 * @description ขณะกำลังโหลด session
 */

const Loading: NavbarContentLoadingType = () => {
  return (
    <div className="flex items-center space-x-2 [&>div]:h-4 [&>div]:w-12 [&>div]:flex-1 [&>div]:animate-pulse [&>div]:rounded-full [&>div]:bg-gray-200">
      <div />
      <div className="hidden sm:block" />
      <div className="hidden sm:block" />
    </div>
  );
};

/**
 * @description แสดงรายการ Navbar item แต่ละรายการ
 */

const List: NavbarContentListItemType = ({ path, children, closeDrawer }) => {
  const currentPathName = usePathname();
  const isActive = path === currentPathName;

  const checkCloseDrawer = () => {
    closeDrawer && closeDrawer();
  };

  return (
    <li
      className={`${
        isActive ? "text-gray-800 underline decoration-blue-500 underline-offset-4 " : "text-gray-500"
      } w-full sm:w-auto`}
    >
      <Link href={path} className="block w-full p-4 sm:inline-block sm:w-auto sm:p-0" onClick={checkCloseDrawer}>
        {children}
      </Link>
    </li>
  );
};

const NavbarContent = {
  MobileDrawer,
  Wrapper,
  Loading,
  List,
};

export default NavbarContent;
