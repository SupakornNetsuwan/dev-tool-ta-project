import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";
import Page from "./components/Page";

const page = async () => {
  return (
    <>
      <GoBackBtn />
      <PageWrapper className="max-w-8xl">
        <Page />
      </PageWrapper>
    </>
  );
};

export default page;
