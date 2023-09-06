import Main from "./components/Course";
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";

const page: React.FC<{ params: { subjectId: string } }> = ({ params }) => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper>
        <Main />
      </PageWrapper>
    </>
  );
};
export default page;
