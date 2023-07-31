"use client";
import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

const ClientTooltipProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <Tooltip.Provider delayDuration={100}>{children}</Tooltip.Provider>;
};

export default ClientTooltipProvider;
