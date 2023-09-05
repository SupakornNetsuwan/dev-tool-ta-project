import React from "react";
import GoBackBtn from "@/core/components/GoBackBtn";
import PageWrapper from "@/core/components/PageWrapper";
import Page from "./components/Page";
import ShareWorkLoadProvider from "./providers/ShareWorkLoadProvider";
const page = () => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper>
        <ShareWorkLoadProvider>
          <Page />
        </ShareWorkLoadProvider>
      </PageWrapper>
    </>
  );
};

export default page;
