import GoBackBtn from "@/core/components/GoBackBtn";
import PageWrapper from "@/core/components/PageWrapper";
import React from "react";
import Verify from "./components/Verify";


const page = () => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper className="rounded bg-white p-4">
        <Verify />
      </PageWrapper>
    </>
  );
};

export default page;
