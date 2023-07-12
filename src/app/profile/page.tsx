import React from "react";
import PageWrapper from "./components/PageWrapper";
import ProfileForm from "./components/ProfileForm";
// React hook form
import ProfileFormProvider from "./providers/ProfileFormProvider";

export const metadata = {
  title: "จัดการบัญชีผู้ใช้",
};

const page = () => {
  return (
    <PageWrapper>
      <ProfileFormProvider>
        <ProfileForm />
      </ProfileFormProvider>
    </PageWrapper>
  );
};

export default page;
