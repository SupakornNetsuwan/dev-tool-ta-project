import DisplayStudents from "./components/DisplayStudents";

const page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  return (
    <>
      <div>{subjectId}</div>
      <DisplayStudents subjectId={subjectId}></DisplayStudents>
    </>
  );
};
export default page;
