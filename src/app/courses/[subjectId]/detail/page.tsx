import React from "react";
import CourseDetailForm from "./components/CourseDetailForm";
import ProfileFormProvider from "./providers/ProfileFormProvider";
import PageWrapper from "@/core/components/PageWrapper";
import GoBackBtn from "@/core/components/GoBackBtn";
import EnrollableCourseRouteGuard from "../layouts/EnrollableCourseRouteGuard";

const page = async ({ params: { subjectId } }: { params: { subjectId: string } }) => {
  return (
    <EnrollableCourseRouteGuard>
      <ProfileFormProvider subjectId={subjectId}>
        <GoBackBtn />
        <PageWrapper className="rounded bg-white p-4">
          <CourseDetailForm />
        </PageWrapper>
      </ProfileFormProvider>
    </EnrollableCourseRouteGuard>
  );
};

export default page;
