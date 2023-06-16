"use client";
import React from "react";
import * as Separator from "@radix-ui/react-separator";

type SubNavbarSapartorType = (
  props: React.HTMLAttributes<typeof Separator.Root> & { orientation: "vertical" | "horizontal" }
) => JSX.Element;

const SubNavbarSapartor: SubNavbarSapartorType = ({ orientation }) => {
  return (
    <Separator.Root
      data-orientation={orientation}
      className="mx-[15px] bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-[full] data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
    />
  );
};

export default SubNavbarSapartor;
