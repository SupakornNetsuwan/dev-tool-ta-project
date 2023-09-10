import React from "react";
import checkAuth from "@/core/func/checkAuth";
import { redirect } from "next/navigation";

const layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const { hasPermission } = await checkAuth(["STUDENT", "PROFESSOR", "ADMIN", "SUPERADMIN"]);
  if (!hasPermission) redirect("/login");

  return <>{children}</>;
};

export default layout;
