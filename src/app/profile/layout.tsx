import React from "react";

import checkAuth from "@/core/func/checkAuth";
import { redirect } from "next/navigation";

const layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const { session, hasPermission } = await checkAuth(["ADMIN", "SUPERADMIN", "STUDENT", "PROFESSOR"]);
  if (!session) return redirect("/login");

  return <>{children}</>;
};

export default layout;
