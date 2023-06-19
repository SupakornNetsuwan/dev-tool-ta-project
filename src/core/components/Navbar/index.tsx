"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarContent from "./NavbarContent";
import useScrollAmount from "@/core/hooks/useScrollAmount";

const Navbar = () => {
  const scrollHeight = useScrollAmount();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const atcrollThreshold = scrollHeight > 50;
  const closeDrawer = () => setIsDrawerOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);

  return (
    <>
      <NavbarContent.MobileDrawer closeDrawer={closeDrawer} isDrawerOpen={isDrawerOpen}>
        {(items) =>
          items.map(({ name, path }) => (
            <NavbarContent.List closeDrawer={closeDrawer} key={name} path={path}>
              {name}
            </NavbarContent.List>
          ))
        }
      </NavbarContent.MobileDrawer>
      <div
        className={`${
          atcrollThreshold ? "translate-y-0 px-0" : "translate-y-4 px-4"
        } sticky top-0 transition-all duration-200`}
      >
        <div
          className={`${
            atcrollThreshold ? "rounded-none border-l-0 border-r-0" : "rounded-lg "
          } flex justify-between border border-slate-200 bg-gradient-metal px-4 py-3 shadow-realistic-2 backdrop-blur sm:px-12`}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/static/itkmitl-small.svg"
              alt="itkmitl-banner"
              priority={true}
              loading="eager"
              width={40}
              height={40}
              className="relative sm:hidden"
            />
            <div className="relative hidden h-16 w-52 sm:block">
              <Image src="/static/itkmitl.svg" alt="itkmitl-banner" priority={true} loading="eager" fill={true} />
            </div>
          </Link>
          <NavbarContent.Wrapper openDrawer={openDrawer} onLoading={() => <NavbarContent.Loading />}>
            {(items) =>
              items.map(({ name, path }) => (
                <NavbarContent.List key={name} path={path}>
                  {name}
                </NavbarContent.List>
              ))
            }
          </NavbarContent.Wrapper>
        </div>
      </div>
    </>
  );
};

export default Navbar;
