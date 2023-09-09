import React from "react";
import checkAuth from "@/core/func/checkAuth";
import { redirect } from "next/navigation";
import PageWrapper from "@/core/components/PageWrapper";

const layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const { hasPermission } = await checkAuth(["STUDENT", "PROFESSOR", "ADMIN", "SUPERADMIN"]);
  if (!hasPermission) redirect("/login");

  return (
    <>
      <p></p>
      <PageWrapper className="mb-12 rounded bg-gray-50 p-4">{children}</PageWrapper>
    </>
  );
};

export default layout;
