import React from "react";
import CourseDetailForm from "./components/CourseDetailForm";
import ProfileFormProvider from "./providers/ProfileFormProvider";
import PageWrapper from "./components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";

const page = async ({ params: { subjectId } }: { params: { subjectId: string } }) => {
  return (
    <ProfileFormProvider subjectId={subjectId}>
      <GoBackBtn />
      <PageWrapper>
        <CourseDetailForm />
      </PageWrapper>
    </ProfileFormProvider>
  );
};

export default page;
