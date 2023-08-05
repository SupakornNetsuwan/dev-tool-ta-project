import React from "react";
import Course from "./components/Course";
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";

const page = async ({ params }: { params: { subjectId: string } }) => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper>
        <Course />
      </PageWrapper>
    </>
  );
};

export default page;
