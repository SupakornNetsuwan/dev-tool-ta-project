import CourseDetail from "./components/CourseDetail";

const page: React.FC<{ params: { courseName: string } }> = ({ params: { courseName } }) => {
  return (
    <>
      <CourseDetail courseName={courseName}></CourseDetail>
    </>
  );
};
export default page;
