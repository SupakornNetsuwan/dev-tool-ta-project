"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarContent from "./NavbarContent";
import useScrollAmount from "@/core/hooks/useScrollAmount";

const Navbar = () => {
  const scrollHeight = useScrollAmount();

  const atcrollThreshold = scrollHeight > 50;

  return (
    <div
      className={`${
        atcrollThreshold ? "translate-y-0 px-0" : "translate-y-4 px-4"
      } sticky top-0 transition-all duration-200`}
    >
      <div
        className={`${
          atcrollThreshold ? "rounded-none border-l-0 border-r-0" : "rounded-lg "
        } flex justify-between border border-slate-200 bg-gradient-metal px-12 py-3 shadow-realistic-2 backdrop-blur`}
      >
        <Link href="/">
          <div className="relative h-16 w-52">
            <Image src="/static/itkmitl.svg" alt="itkmitl-banner" priority={true} loading="eager" fill={true} />
          </div>
        </Link>
        <NavbarContent.Wrapper onLoading={() => <NavbarContent.Loading />}>
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
  );
};

export default Navbar;
