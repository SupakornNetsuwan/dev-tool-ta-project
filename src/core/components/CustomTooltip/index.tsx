import React, { forwardRef } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";

export const TooltipContent = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode } & React.ComponentPropsWithRef<typeof Tooltip.Content>
>(({ children, className, ...props }, ref) => {
  return (
    <Tooltip.Content
      {...props}
      className={twMerge(
        "select-none rounded px-[15px] py-[10px] text-sm leading-none shadow-realistic-2 will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
        className
      )}
      ref={ref}
    >
      {children}
      <Tooltip.Arrow className="fill-white" />
    </Tooltip.Content>
  );
});

TooltipContent.displayName = "tootltipContent";

const tooltip: React.FC<
  { children: React.ReactNode; renderContent: React.ReactElement } & React.ComponentPropsWithoutRef<typeof Tooltip.Root>
> = ({ children, renderContent, ...props }) => {
  return (
    <Tooltip.Root {...props}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>{renderContent}</Tooltip.Portal>
    </Tooltip.Root>
  );
};

const CustomTooltip = {
  tooltip,
  TooltipContent,
};

export default CustomTooltip;
