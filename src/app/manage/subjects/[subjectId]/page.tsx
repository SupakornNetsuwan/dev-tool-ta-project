import Main from "./components/Main";
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";

const page: React.FC<{ params: { subjectId: string } }> = ({ params: { subjectId } }) => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper>
        <Main subjectId={subjectId} />
      </PageWrapper>
    </>
  );
};
export default page;
