import dynamic from "next/dynamic";
const DisplayStudents = dynamic(() => import("./components/DisplayStudents"));

const page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  return <DisplayStudents subjectId={subjectId} />;
};

export default page;
