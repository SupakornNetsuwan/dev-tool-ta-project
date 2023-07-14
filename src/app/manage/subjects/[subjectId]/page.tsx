import Course from "./components/Course";

const page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  return (
    <>
      <Course subjectId={subjectId} />
    </>
  );
};
export default page;
