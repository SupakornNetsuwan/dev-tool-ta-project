import React from "react";
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";

const page = () => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper className="max-w-6xl rounded bg-white">page</PageWrapper>;
    </>
  );
};

export default page;
