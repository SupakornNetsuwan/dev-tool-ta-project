import DisplayStudents from "./components/DisplayStudents";

const page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  return (
    <>
      
      <DisplayStudents subjectId={subjectId}></DisplayStudents>
    </>
  );
};
export default page;
