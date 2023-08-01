import React from "react";
import CourseDetailForm from "./components/CourseDetailForm";
import ProfileFormProvider from "./providers/ProfileFormProvider";
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";

const page = async ({ params: { subjectId } }: { params: { subjectId: string } }) => {
  return (
    <ProfileFormProvider subjectId={subjectId}>
      <GoBackBtn />
      <PageWrapper className="bg-white p-4 rounded">
        <CourseDetailForm />
      </PageWrapper>
    </ProfileFormProvider>
  );
};

export default page;
