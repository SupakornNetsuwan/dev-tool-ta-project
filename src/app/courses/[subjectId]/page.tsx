import React from "react";

const page = ({ params }: { params: { subjectId: string } }) => {
  console.log(params.subjectId);

  return <div>Subject ID</div>;
};

export default page;
