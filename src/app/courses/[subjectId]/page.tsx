import React from "react";
import Course from "./components/Course";

const page = async ({ params }: { params: { subjectId: string } }) => {
  return (
    <>
      <Course subjectId={params.subjectId} />
    </>
  );
};

export default page;
