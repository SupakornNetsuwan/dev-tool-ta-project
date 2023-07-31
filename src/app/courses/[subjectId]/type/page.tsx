import React from "react";
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";
// Components
import CourseType from "./components/CourseType";

const page = ({ params: { subjectId } }: { params: { subjectId: string } }) => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper className="max-w-6xl rounded bg-white p-4">
        <CourseType subjectId={subjectId} />
      </PageWrapper>
    </>
  );
};

export default page;
