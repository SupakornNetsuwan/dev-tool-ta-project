import React from "react";
import GoBackBtn from "@/core/components/GoBackBtn";
import PageWrapper from "@/core/components/PageWrapper";
import Page from "./components/Page";

const page = () => {
  return (
    <>
      <PageWrapper>
        <GoBackBtn />
        <Page />
      </PageWrapper>
    </>
  );
};

export default page;
