import React from "react";
import { usePathname } from "next/navigation";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import type { NavbarContentListItemType, NavbarContentLoadingType, NavbarContentWrapperType } from "./NavbarTypes";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

// // Each role's interface
// import SuperAdminNavbar from "./interfaces/SuperAdminNavbar";
// import AdminNavbar from "./interfaces/AdminNavbar";
// import ProfessorNavbar from "./interfaces/ProfessorNavbar";
// import StudentNabvar from "./interfaces/StudentNavbar";

const Wrapper: NavbarContentWrapperType = ({ children, onLoading }) => {
  const { data: session, status } = useSession();

  const rolesItem = {
    SUPERADMIN: [{ name: "หน้าหลัก", path: "/" }],
    ADMIN: [
      { name: "หน้าหลัก", path: "/" },
      { name: "จัดการ", path: "/manage" },
    ],
    PROFESSOR: [{ name: "หน้าหลัก", path: "/" }],
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

  const isLoading = status === "loading";
  if (isLoading) return onLoading();
  return (
    <ul className="flex items-center gap-x-4">
      {children(rolesItem[session?.user.role || "UNROLE"])}
      {session?.user.role && (
        <li>
          <button
            onClick={() => signOut({ redirect: false })}
            className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-500 shadow-realistic-2 transition-colors duration-100 hover:border-red-500 hover:bg-red-50 hover:text-red-500 hover:shadow-none"
          >
            ออกจากระบบ
            <HiOutlineArrowRightOnRectangle />
          </button>
        </li>
      )}
    </ul>
  );
};

/**
 * @description ขณะกำลังโหลด session
 */

const Loading: NavbarContentLoadingType = () => {
  return (
    <div className="flex items-center space-x-2 [&>div]:h-4 [&>div]:w-12 [&>div]:flex-1 [&>div]:animate-pulse [&>div]:rounded-full [&>div]:bg-gray-200">
      <div />
      <div />
      <div />
    </div>
  );
};

/**
 * @description แสดงรายการ Navbar item แต่ละรายการ
 */

const List: NavbarContentListItemType = ({ path, children }) => {
  const currentPathName = usePathname();
  const isActive = path === currentPathName;
  return (
    <li className={`${isActive ? "text-gray-800 underline decoration-blue-500 underline-offset-4" : "text-gray-500"} `}>
      <Link href={path}>{children}</Link>
    </li>
  );
};

const NavbarContent = {
  Wrapper,
  Loading,
  List,
};

export default NavbarContent;
