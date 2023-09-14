import React from "react";
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper>{children}</PageWrapper>
    </>
  );
};

export default layout;
