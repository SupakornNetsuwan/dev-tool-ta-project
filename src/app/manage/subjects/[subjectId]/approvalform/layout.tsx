import React from "react";
import GoBackBtn from "@/core/components/GoBackBtn";
import PageWrapper from "@/core/components/PageWrapper";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper className="max-w-8xl">{children}</PageWrapper>
    </>
  );
};

export default layout;
