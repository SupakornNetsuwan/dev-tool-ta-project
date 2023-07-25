import React from "react";
import { twMerge } from "tailwind-merge";

const PageWrapper: React.FC<{ children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={twMerge("mx-auto min-h-[150vh] w-full max-w-3xl px-4", className)} {...props}>
      {children}
    </div>
  );
};

export default PageWrapper;
