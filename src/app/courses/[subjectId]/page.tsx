import React from "react";
import Main from "./components/Main";
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";

const page = async ({ params }: { params: { subjectId: string } }) => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper>
        <Main subjectId={params.subjectId} />
      </PageWrapper>
    </>
  );
};

export default page;
