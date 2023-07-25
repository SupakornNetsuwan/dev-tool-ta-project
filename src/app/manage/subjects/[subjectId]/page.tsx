import Course from "./components/Course";
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";

const page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper>
        <Course subjectId={subjectId} />
      </PageWrapper>
    </>
  );
};
export default page;
