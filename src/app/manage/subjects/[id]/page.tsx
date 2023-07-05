"use client"

import StatusCourse from "./components/StatusCourseComponent";
const page = ({ params }: { params: { id: string } }) => {
  const param:string = params.id
  return (
    <>
      <StatusCourse course={param}></StatusCourse>
    </>
  );
};
export default page;
  